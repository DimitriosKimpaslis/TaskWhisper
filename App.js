import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { Cloud } from './Views/Cloud';
import { Create } from './Views/Create';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TasksStackNavigator } from './Componets/TaskNavigator';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import DateTime from './Componets/DateTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from './pushNotify';
import { Test } from './Test';


const Tab = createBottomTabNavigator();

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  React.useEffect(() => {
    setLoggedIn(false);
  }
    , [])

  React.useEffect(() => {
    const initiateCategories = async () => {
      const categories = await AsyncStorage.getItem('categories');
      if (!categories) {
        await AsyncStorage.setItem('categories', JSON.stringify([]));
      }
    }

    initiateCategories();
    registerForPushNotificationsAsync()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Tasks'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Cloud') {
              iconName = focused ? 'cloud' : 'cloud-outline';
            } else if (rn === 'TasksNavigate') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === 'Create') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10
          },
          tabBarStyle: [
            {
              display: "flex",
              padding: 10,
              height: 70
            },
            null
          ]
        })}>

        <Tab.Screen name={'TasksNavigate'} component={TasksStackNavigator} options={{ title: 'Tasks' }} />
        <Tab.Screen name={'Create'} component={Create} />
        {/* <Tab.Screen name={'Test'} component={Test} /> */}


      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

