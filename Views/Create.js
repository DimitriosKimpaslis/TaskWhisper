import React, { useEffect } from "react";
import { useState } from "react";
import { Text, TextInput, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTime from "../Componets/DateTime";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import {  handleCategoryCreation, handleCategoryDeletion } from "../categories";
import Notification, { schedulePushNotification } from "../Notification";


const priorityColors = {
    'very-low': '#add8e6',
    'low': '#90ee90',
    'medium': '#ffd700',
    'urgent': '#ff8c00',
    'high': '#ff6666',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputTask: {
        width: '80%',
        height: 50,
        padding: 8,
        marginBottom: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        // background color must be set
        backgroundColor: "white"
    },
    inputBody: {
        width: '80%',
        height: 100,
        padding: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        // background color must be set
        backgroundColor: "white",
        marginBottom: 30,
    },
    scrollView: {
        alignItems: 'center',
    },
    option: {
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    very_low: {
        backgroundColor: priorityColors['very-low'],
    },
    low: {
        backgroundColor: priorityColors['low'],
    },
    medium: {
        backgroundColor: priorityColors['medium'],
    },
    urgent: {
        backgroundColor: priorityColors['urgent'],
    },
    high: {
        backgroundColor: priorityColors['high'],
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

});


export function Create({ navigation, route }) {

    const renderKey = route.params?.renderKey;

    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low')
    const [date, setDate] = useState(new Date());
    // const [categories, setCategories] = useState([]);
    // const [category, setCategory] = useState('');
    const [notify, setNotify] = useState(false);

    // const getCategories = async () => {
    //     const categories = await AsyncStorage.getItem('categories');
    //     setCategories(JSON.parse(categories));

    // }

    // useEffect(() => {
    //     getCategories();
    // }, [])

    const handleCreate = async () => {
        let notifyId
        if (notify) {
            notifyId = await schedulePushNotification(task, priority, description, date);
        }
        const newTask = {
            task,
            description,
            priority,
            date,
            // category,
            created_at: new Date(),
            notify,
            notifyId,
            index: Math.random(),
            completed: false,
        };

        // await handleCategoryCreation(category);


        const tasks = await AsyncStorage.getItem('tasks');
        let tasksArray = JSON.parse(tasks);
        if (!tasksArray) {
            tasksArray = [];
        }
        tasksArray.push(newTask);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));

        setTask('');
        setDescription('');
        setPriority('low');
        setDate(new Date());
        // setCategory('');
        setNotify(false);
        // await getCategories();
        navigation.navigate('Tasks', { reloadKey: Math.random() })

    }

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 100 }}></View>
            <Text style={styles.title}>New Task</Text>
            <View style={{ justifyContent: 'center', width: '80%' }}>
                <Text style={{ backgroundColor: priorityColors[priority], padding: 3, marginBottom: 5, width: '100%' }}></Text>
            </View>



            <TextInput
                style={styles.inputTask}
                placeholder="Task"
                onChangeText={text => setTask(text)}
                value={task}
            />
            <TextInput
                style={styles.inputBody}
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                multiline={true}
                numberOfLines={4}
                value={description}
            />


            {/* <View style={{ width: '80%', marginVertical: 20 }}>
                {categories.length > 0 ?
                    <View style={{}}>
                        <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'center' }}>Category</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginVertical: 10 }}>
                            <ScrollView
                                contentOffset={{ x: 20, y: 0 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}
                                style={{ flexGrow: 0, marginHorizontal: 5 }}
                            >
                                {categories.map((category, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={{ backgroundColor: 'black', borderRadius: 15, padding: 8, marginHorizontal: 5 }}
                                            onPress={() => setCategory(category)}
                                        >
                                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                                <Text style={{ color: 'white', marginRight: 10 }}>#{category}</Text>
                                                <AntDesign name="close" size={15} color="white" onPress={async () => {
                                                    await handleCategoryDeletion(category)
                                                    await getCategories();
                                                    }} style={{ top: 2 }} />
                                            </View>

                                        </TouchableOpacity>
                                    )
                                }
                                )}
                            </ScrollView>
                        </View>


                    </View>
                    :
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>No categories yet</Text>
                    </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Feather name="hash" size={24} color="black" />
                    <TextInput style={{ flexGrow: 1, height: 50, padding: 8, marginBottom: 5, shadowOffset: { width: 10, height: 10 }, shadowColor: 'black', shadowOpacity: 0.3, elevation: 3, backgroundColor: "white" }} placeholder="Set new category" onChangeText={text => setCategory(text)} value={category} />
                </View>
            </View> */}




            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3, marginTop: 20 }}>
                <AntDesign name="pushpino" size={24} color="black" />
                <Text style={{ fontSize: 20, fontWeight: '400' }}>Task Importance</Text>
            </View>
            <ScrollView
                contentOffset={{ x: 70, y: 0 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
                style={{ flexGrow: 0, marginBottom: 40, marginTop: 8 }}
            >
                <TouchableOpacity
                    style={[styles.option, styles.very_low]}
                    onPress={() => setPriority('very-low')}
                >
                    <Text style={styles.text}>Very Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, styles.low]}
                    onPress={() => setPriority('low')}
                >
                    <Text style={styles.text}>Low</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option, styles.medium]}
                    onPress={() => setPriority('medium')}
                >
                    <Text style={styles.text}>Medium</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option, styles.urgent]}
                    onPress={() => setPriority('urgent')}
                >
                    <Text style={styles.text}>Urgent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, styles.high]}
                    onPress={() => setPriority('high')}
                >
                    <Text style={styles.text}>High</Text>
                </TouchableOpacity>

            </ScrollView>


            <View style={{ width: '80%', backgroundColor: 'black', height: 1, marginVertical: 5 }}></View>


            <DateTime date={date} setDate={setDate} notify={notify} setNotify={setNotify} />
            <Notification notify={notify} setNotify={setNotify}/>





            <TouchableOpacity style={{ width: '80%', marginBottom: 20 }} onPress={handleCreate}>
                <Text style={{ backgroundColor: 'black', padding: 10, marginBottom: 5, width: '100%', textAlign: 'center', color: 'white' }}>Create</Text>
            </TouchableOpacity>


        </ScrollView >
    );
}


