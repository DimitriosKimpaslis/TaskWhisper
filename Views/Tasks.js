import { Animated, Button, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
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
  const [filterReloadKey, setFilterReloadKey] = useState(0);

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
      if (!tasks) return;
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
  }, [filterReloadKey, reloadKey])

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

  const completeTask = async (task) => {
    task.completed = true;
    const newTasks = tasks.filter((t) => t !== task);
    newTasks.push(task);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
    if(task.notify) await cancelScheduledNotificationAsync(task.notifyId);
  }

  const checkIfAnyUncompletedTasks = () => {
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed) return true;
      }
    }
    return false;
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, marginTop: 10 }}>
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <FilterPopup setFilter={setFilter} setFilterReloadKey={setFilterReloadKey} filterReloadKey={filterReloadKey} />
          <AntDesign name="plus" size={30} color="black" onPress={() => navigation.navigate('Create')} />
        </View>
        {(status === 'ready' && tasks) && tasks.map((task, index) => {
          if (checkIfAnyUncompletedTasks() === false) return <Text style={{ fontSize: 20, fontWeight: '400', fontStyle: 'italic' }}>No tasks to show</Text>
          if (task.completed) return null;
          return (
            <View key={index}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5 }}>
                  {/* category */}
                  <Text style={{ color: '#242629' }}>#{task.category ? task.category : 'task'}</Text>
                  <AntDesign name="check" size={26} color="green" onPress={() => completeTask(task)} />
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate('TaskPage', { task: task })}>
                  {/* title */}
                  <Text style={{ fontSize: 18 }}>{task.task.slice(0, 60) + (task.task.length > 60 ? '...' : '')}</Text>
                  {/* description */}
                  <Text style={{ fontSize: 12 }}>{task.description.slice(0, 300) + (task.description.length > 300 ? '...' : '')}</Text>
                </TouchableOpacity>

                {task.notify &&
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="clockcircle" size={16} color="gray" style={{ marginTop: 10 }} />
                    <Text style={{ fontSize: 12, color: 'grey', marginLeft: 5,marginTop: 8 }}>
                      {new Date(task.date).toLocaleDateString()} {new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>}

              </View>
              <View style={{ backgroundColor: priorityColors[task.priority], width: 15, height: '100%' }}></View>
            </View>
          )

        }
        )}
        <View style={{ height: 1, backgroundColor: 'black', marginVertical: 10 }}></View>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}>Completed</Text>
        {(status === 'ready' && tasks) && tasks.map((task, index) => {
          if (!task.completed) return null;
          return (
            <View key={index}
              style={{
                flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 0.3,
                elevation: 3,
                // background color must be set
                backgroundColor: "white",
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5, marginBottom: 7 }}>
                    <AntDesign name="delete" size={26} color="green" onPress={() => removeTask(task)} />
                  </View>
                  <Text style={{ fontSize: 10, color: 'grey', marginBottom: 5 }}>{new Date(task.created_at).toLocaleDateString()}</Text>
                  <Text style={{ color: '#242629', textDecorationLine: 'line-through' }}>#{task.category ? task.category : 'task'}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('TaskPage', { task: task })}>
                    <Text style={{ fontSize: 18, textDecorationLine: 'line-through' }}>{task.task.slice(0, 60) + (task.task.length > 60 ? '...' : '')}</Text>
                    <Text style={{ fontSize: 12, textDecorationLine: 'line-through' }}>{task.description.slice(0, 300) + (task.description.length > 300 ? '...' : '')}</Text>
                  </TouchableOpacity>
                </View>
                <Image source={require('../images/completed.png')} style={{ width: 100, height: 100, }} />
              </View>

              <View style={{ backgroundColor: priorityColors[task.priority], width: 15, height: '100%' }}></View>
            </View>
          )
        }
        )}
      </ScrollView>
    </SafeAreaView>
  );
}