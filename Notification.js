import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Button, Platform, Text, View } from "react-native";
import Checkbox from "expo-checkbox";

export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: true,
            lightColor: "#FF231F7C",
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            bypassDnd: true,
        });
    }

    return token;
}


// export default function Notification() {
//     const [expoPushToken, setExpoPushToken] = useState("");
//     const [notification, setNotification] = useState(false);
//     const notificationListener = useRef();
//     const responseListener = useRef();

//     useEffect(() => {
//         registerForPushNotificationsAsync().then((token) =>
//             setExpoPushToken(token)
//         );

//         notificationListener.current =
//             Notifications.addNotificationReceivedListener((notification) => {
//                 setNotification(notification);
//             });

//         responseListener.current =
//             Notifications.addNotificationResponseReceivedListener((response) => {
//                 console.log(response);
//             });

//         return () => {
//             Notifications.removeNotificationSubscription(
//                 notificationListener.current
//             );
//             Notifications.removeNotificationSubscription(responseListener.current);
//         };
//     }, []);

//     return (
//         null
//     );
// }

export default function Notification({notify, setNotify}) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        // Check if the app has notification permissions
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        // If permissions are not granted, ask for permission
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        // If permission is granted, get the token
        if (finalStatus === 'granted') {
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            return token;
        } else {
            // Handle the case where the user does not grant permission
            console.log('Permission not granted');
            return 'not granted';
        }
    };

    const handleNotifyMePress = async () => {
        // Call the function to register for push notifications
        const token = await registerForPushNotificationsAsync();

        // Update the state with the new token
        setExpoPushToken(token);
        return token
    };

    useEffect(() => {
        const handleAsyncNotification = async () => {
            if(notify){
                const result = await handleNotifyMePress()
                console.log(result)
                if(result === 'not granted'){
                    alert('Notification permission not granted');
                }
            }
        }
        handleAsyncNotification();
    }
        , [notify]);


    return (
        <View style={{alignItems: 'center', flexDirection: 
        'row', marginBottom: 10}}>
            <Text style={{ fontSize: 18, bottom: 2 }}>Notify me</Text>
            <Checkbox style={{ margin: 8 }} value={notify} onValueChange={setNotify} />
        </View>
    );
}


export async function schedulePushNotification(
    taskTitle,
    taskPriority,
    taskDescription,
    taskDate
) {
    const color = {
        'very-low': '#add8e6',
        'low': '#90ee90',
        'medium': '#ffd700',
        'urgent': '#ff8c00',
        'high': '#ff6666',
    }[taskPriority];

    taskPriority = taskPriority
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    taskPriority = taskPriority + " Priority";


    taskTitle = taskTitle || "Task";

    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: taskTitle,
            subtitle: taskPriority,
            body: taskDescription.slice(0, 100) + taskDescription.length > 100 ? "..." : "",
            vibrate: true,
            color: color,
            sound: true,
            priority: "high",
            sticky: false,
        },
        trigger: new Date(taskDate),
    });
    console.log("notif id on scheduling", id)
    return id;
}

export async function cancelNotification(notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
}