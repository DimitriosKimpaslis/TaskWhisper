import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Views/Home';
import { Tasks } from './Views/Tasks';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitle: '',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Text>Menu</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Text>Settings</Text>
            </View>
          ),
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tasks" component={Tasks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
