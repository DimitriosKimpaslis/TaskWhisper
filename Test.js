import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputTask: {
        width: '80%',
        height: 50,
        padding: 8,
        marginBottom: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        // background color must be set
        backgroundColor: "white"
    },
    inputBody: {
        width: '80%',
        height: 100,
        padding: 8,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        // background color must be set
        backgroundColor: "white",
        marginBottom: 30,
    },
    scrollView: {
        alignItems: 'center',
    },
    option: {
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export const Test = ({ navigation }) => {
    const [description, setDescription] = useState('');

    return (
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Text style={styles.title}>Test</Text>
                <TextInput
                    style={styles.inputBody}
                    placeholder="Description"
                    onChangeText={text => setDescription(text)}
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                />
            </ScrollView>
    )
}

