import React, { useEffect, useState } from 'react'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { styles } from '../constants/styles';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';



const DateTime = ({ date, setDate, notify, setNotify }) => {

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: false,
            minimumDate: new Date(),
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={{ width: '80%', marginVertical: 20 }}>

            <View style={{ flex: 0, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name="calendar-times-o" size={24} color="black"  />
                <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                    <Text style={{ color: '#FFFFFF' }}>{date.toISOString().split('T')[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showTimepicker}>
                    <Text style={{ color: '#FFFFFF' }}>{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 18 }}>Notify me</Text>
                <Checkbox style={{ margin: 8 }} value={notify} onValueChange={setNotify} />
            </View> */}
        </View>
    );
};


export default DateTime