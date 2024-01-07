import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./pushNotify";


export default function Notification() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        null
    );
}

export async function schedulePushNotification(
    taskTitle,
    taskPriority,
    taskDescription,
    taskDate
) {
    const dateToNotify = new Date(taskDate);

    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: taskTitle,
            subtitle: taskPriority,
            body: taskDescription.slice(0, 100) + "...",
            // sound: 'default',
        },
        trigger: new Date(Date.now() + 5 * 1000),
    });
    console.log("notif id on scheduling", id)
    return id;
}

export async function cancelNotification(notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
}