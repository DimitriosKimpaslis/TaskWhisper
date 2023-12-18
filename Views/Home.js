import { Button, SafeAreaView, Text, View } from "react-native";

export function Home({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to Tasks" onPress={() => navigation.navigate('Tasks')} />
        </SafeAreaView>
    );
}