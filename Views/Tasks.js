import { Animated, Button, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { FilterPopup } from "../Componets/Filter";

export function Tasks({ navigation, route }) {
  const { reloadKey } = route.params || {};
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('loading');
  const [filter, setFilter] = useState('high');

  const priorityOrder = {
    'very-low': 1,
    'low': 2,
    'medium': 3,
    'urgent': 4,
    'high': 5,

  }

  useEffect(() => {
    const getTasks = async () => {
      let tasks = await AsyncStorage.getItem('tasks');
      tasks = JSON.parse(tasks);
      return tasks;
    }
    getTasks().then((res) => {
      setTasks(res);
      setStatus('ready');
    }
    )

  }, [reloadKey])

  useEffect(() => {
    const sortTasks = async () => {
      let tasks = await AsyncStorage.getItem('tasks');
      tasks = JSON.parse(tasks);
      if(!tasks) return;
      if (filter === 'recent') {
        tasks.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      } else if (filter === 'high') {
        tasks.sort((a, b) => {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        })
      }
      else if (filter === 'low') {
        tasks.sort((a, b) => {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
      } else if (filter === 'recent') {
        tasks.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        })
      }
      setTasks(tasks);
    }
    sortTasks();
  }, [filter])

  const priorityColors = {
    'very-low': '#add8e6',
    'low': '#90ee90',
    'medium': '#ffd700',
    'urgent': '#ff8c00',
    'high': '#ff6666',
  }

  const removeTask = async (task) => {
    const newTasks = tasks.filter((t) => t !== task);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <FilterPopup filter={filter} setFilter={setFilter} />
          <AntDesign name="plus" size={40} color="black" onPress={() => navigation.navigate('Create')} />
        </View>
        {(status === 'ready' && tasks) && tasks.map((task, index) => {
          return (
            <Animated.View key={index}
              style={{
                flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 0.3,
                elevation: 3,
                // background color must be set
                backgroundColor: "white",
              }}
              >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5, marginBottom: 7 }}>
                  <AntDesign name="edit" size={30} color="black" onPress={() => navigation.navigate('Create', { edit: true, renderKey: Math.random(), taskToEdit: tasks[index] })} />
                  <AntDesign name="check" size={36} color="green" onPress={() => removeTask(task)} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('TaskPage',{ task: task})}>
                  <Text style={{ fontSize: 25 }}>{task.task.slice(0,60) + (task.task.length > 60 ? '...' : '')}</Text>
                  <Text>{task.description.slice(0,300) + (task.description.length > 300 ? '...' : '')}</Text>
                </TouchableOpacity>

              </View>
              <View style={{ backgroundColor: priorityColors[task.priority], width: 15, height: '100%' }}></View>
            </Animated.View>
          )

        }
        )}
      </ScrollView>
    </SafeAreaView>
  );
}