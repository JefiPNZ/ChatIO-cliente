import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Alert } from 'react-native';
import ContactList from '../components/ContactList';
import GlobalStyles from '../styles/Global'
import { sendData } from '../Connection/Server';
import { GET_CONTACT_LIST_MESSAGE } from '../Connection/MessageTypes';

export default ({ navigation }) => {

    const [contacts, setContacts] = useState([]);

    const refreshContacts = ()=>{
        sendData(GET_CONTACT_LIST_MESSAGE, '',
        data => {
            console.log('data', data);
            setContacts(data);
        },
        error =>{
            Alert.alert(
                'Erro na busca dos contatos',
                error.message,
                [
                    {text: 'OK'}
                ]
            )  
        });
        /*
        setContacts([
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
            { nickname: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1', ip: '192.168.2.151'},//192.168.2.136
        ]);
        */
    }
    useEffect(refreshContacts, []);

    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>Lista de contatos</Text>
            <ContactList contacts={contacts} navigation={navigation} refreshContacts={refreshContacts}/>
        </SafeAreaView>
    );
}
