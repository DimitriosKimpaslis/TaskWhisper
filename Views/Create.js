import React, { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView, Text, TextInput, View, StyleSheet, ScrollView, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTime from "../Componets/DateTime";
import * as Notifications from 'expo-notifications';

async function scheduleNotification(title, body, data, seconds) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}


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
        padding: 8,
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
    const [categories, setCategories] = useState([]);
    const [notify, setNotify] = useState(false);

    const handleCreate = async () => {
        const newTask = {
            task,
            description,
            priority,
            date,
            created_at: new Date(),
            index: Math.random(),
            completed: false,
        };

        const tasks = await AsyncStorage.getItem('tasks');
        let tasksArray = JSON.parse(tasks);
        if (!tasksArray) {
            tasksArray = [];
        }
        tasksArray.push(newTask);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
        if (notify) {
            scheduleNotification();
        }
        setTask('');
        setDescription('');
        setPriority('low');
        navigation.navigate('Tasks', { reloadKey: Math.random() })

    }

    return (
        <SafeAreaView style={styles.container}>

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

            <DateTime date={date} setDate={setDate} notify={notify} setNotify={setNotify} />


            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: '500' }}>Priority</Text>



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
            <TouchableOpacity style={{ width: '80%' }} onPress={handleCreate}>
                <Text style={{ backgroundColor: 'black', padding: 10, marginBottom: 5, width: '100%', textAlign: 'center', color: 'white' }}>Create</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


