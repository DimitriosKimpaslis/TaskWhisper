import { useEffect } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

export function Cloud({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Log in</Text>
            <Text>Log in to sync your tasks between your devices</Text>
        </SafeAreaView>
    );
}