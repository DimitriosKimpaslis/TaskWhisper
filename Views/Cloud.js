// import { Button, SafeAreaView, Text, View } from "react-native";

// import { generateClient } from 'aws-amplify/api';
// import { createTask } from '../src/graphql/mutations';
// import { listTasks} from '../src/graphql/queries';

// const client = generateClient();


// export function Cloud({ navigation }) {
    
//     const handleUpload = async () => {
//         try{
//             let tasks = await AsyncStorage.getItem('tasks');
//             tasks = JSON.parse(tasks);
//             if(!tasks) return;
//             await client.graphql({
//                 query: createTask,
//                 variables: {
//                   input: tasks
//                 }
//               })
//         }catch(e){
//             console.log('error creating task',e);
//         }

//     }

//     const handleList = async () => {
//         try{
//             const result = await client.graphql({
//                 query: listTasks,
//                 variables: {
//                   input: tasks
//                 }
//               })
//               console.log('result',result);
//         }catch(e){
//             console.log('error listing task',e);
//         }

//     }

//     return (
//         <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Log in</Text>
//             <Text>Log in to sync your tasks between your devices</Text>
//             <Button onPress={handleUpload}>Upload to cloud</Button>
//             <Button onPress={handleList}>List from cloud</Button>
//         </SafeAreaView>
//     );
// }