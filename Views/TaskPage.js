import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                {task &&
                    <View
                        style={{
                            flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, shadowOffset: { width: 10, height: 10 },
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            elevation: 3,
                            // background color must be set
                            backgroundColor: "white"

                        }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <Text style={{ fontSize: 25 }}>{task.task}</Text>
                            <Text>{task.description}</Text>

                        </View>
                        <View style={{ backgroundColor: priorityColors[task.priority], width: 15, height: '100%' }}></View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default TaskPage