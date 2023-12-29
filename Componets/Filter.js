import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const FilterPopup = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { setFilter, setFilterReloadKey, filterReloadKey } = props;
    return (
        <View style={styles.container}>
            {/* Trigger Button */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <MaterialIcons name="sort" size={40} color="black" />
            </TouchableOpacity>

            {/* Modal for Filters */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={{marginBottom: 15, textAlign: 'center', fontSize: 25, fontWeight: '600'}}>Filter Options</Text>

                    <TouchableOpacity onPress={() => {
                        setFilter('high')
                        setFilterReloadKey(filterReloadKey + 1);
                        setModalVisible(!modalVisible);
                    }}
                    style={{width:'100%', alignItems: 'center', marginBottom: 5}}>
                        <Text style={{fontSize: 15,backgroundColor: '#f0f0f0', padding: 6, borderRadius: 5, width: '80%', textAlign: 'center'}}>High Priority First</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%', alignItems: 'center',marginBottom: 5}} onPress={() => {
                        setFilter('low')
                        setFilterReloadKey(filterReloadKey + 1);

                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={{fontSize: 15,backgroundColor: '#f0f0f0', padding: 6, borderRadius: 5, width: '80%', textAlign: 'center'}}>Low Priority First</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%', alignItems: 'center'}} onPress={() => {
                        setFilter('recent')
                        setFilterReloadKey(filterReloadKey + 1);

                        setModalVisible(!modalVisible);
                    }}>
                        <Text style={{fontSize: 15,backgroundColor: '#f0f0f0', padding: 6, borderRadius: 5, width: '80%', textAlign: 'center'}}>Recent</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        
    }
});