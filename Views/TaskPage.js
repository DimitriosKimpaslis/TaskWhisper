import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const TaskPage = ({ navigation, route }) => {
    const { task } = route.params || {};

    const priorityColors = {
        'very-low': '#add8e6',
        'low': '#90ee90',
        'medium': '#ffd700',
        'urgent': '#ff8c00',
        'high': '#ff6666',
    }
    return (
        <ScrollView style={{ width: '100%', marginTop: 20 }} showsVerticalScrollIndicator={false}>
            <View
                style={{
                    flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, shadowOffset: { width: 10, height: 10 },
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    elevation: 3,
                    backgroundColor: "white",
                }}
            >
                <View style={{ flex: 1, paddingRight: 10 }}>
                    {/* date created */}
                    <Text style={{ fontSize: 10, color: 'grey', marginBottom: 5 }}>{new Date(task.created_at).toLocaleDateString()}</Text>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5 }}> 
                        <Text style={{ color: '#242629' }}>#{task.category ? task.category : 'task'}</Text>
                    </View> */}

                    {/* title */}
                    {task.task && <Text style={{ fontSize: 18 }}>{task.task}</Text>}
                    
                    {/* description */}
                    {task.description && <Text style={{ fontSize: 12 }}>{task.description}</Text>}

                    {task.notify &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="clockcircle" size={16} color="gray" style={{ marginTop: 10 }} />
                            <Text style={{ fontSize: 12, color: 'grey', marginLeft: 5, marginTop: 8 }}>
                                {new Date(task.date).toLocaleDateString()} {new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>}

                </View>
                <View style={{ backgroundColor: priorityColors[task.priority], width: 15, height: '100%' }}></View>
            </View>
        </ScrollView>
    )
}

export default TaskPage