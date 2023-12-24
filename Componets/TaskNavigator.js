// Desc: This file contains the navigator for the Tasks page
import { Tasks } from '../Views/Tasks';
import TaskPage from '../Views/TaskPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TasksStack = createNativeStackNavigator();

export function TasksStackNavigator() {
  return (
    <TasksStack.Navigator>
      <TasksStack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }}/>
      <TasksStack.Screen name="TaskPage" component={TaskPage} options={{title: ''}}/>
      {/* Add more screens here as needed */}
    </TasksStack.Navigator>
  );
}