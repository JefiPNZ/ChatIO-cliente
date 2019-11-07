import React, { useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity } from 'react-native';
import Styles from '../styles/S.ContactList';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default ({ contacts }) => {

    const [showModal, handleModal] = useState(false);

    const handleAddContact = () => {
        handleModal(!showModal);
    };

    return (
        <>
            <Modal visible={showModal}>
                <View>
                <TouchableOpacity onPress={handleAddContact} style={{height: 500, width: '100%', backgroundColor: '#ff1599'}}>
                    <Text>Fechar</Text>
                </TouchableOpacity>
                </View>
            </Modal>
            <FlatList
                data={[
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '0' },
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1' },
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '2' },
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '3' },
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '4' },
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '5' },
                    { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '6' },
                ]}
                renderItem={contact => {
                    const { item } = contact;
                    return (
                        <View style={Styles.container} key={item.id}>
                            <View style={Styles.iconContainer}>
                                <TouchableOpacity onPress={handleAddContact}>
                                    <Icon style={Styles.icon} name="user-check" size={25} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleAddContact}>
                                    <Icon style={Styles.icon} name="user-minus" size={25} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.textContainer}>
                                <Text style={Styles.contactName}>{item.name}</Text>
                                <Text style={Styles.contactDescription}>{item.email}</Text>
                                <Text style={Styles.contactDescription}>{item.birthDate}</Text>
                            </View>
                        </View>
                    )
                }} />
        </>
    );
};