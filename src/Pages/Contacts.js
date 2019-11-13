import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import ContactList from '../components/ContactList';
import GlobalStyles from '../styles/Global'
import ServerActions from '../Connection/ServerActions';
import { GET_CONTACT_LIST_MESSAGE } from '../Connection/MessageTypes';

export default ({ navigation }) => {

    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        ServerActions.writeMessage('', GET_CONTACT_LIST_MESSAGE);
        ServerActions.awaitResponse(data => {
            console.log('message was received', JSON.parse(data.toString('utf8')));
            setContacts(JSON.parse(data.toString('utf8')))
        });
        setContacts([
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '0' },
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1' },
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '2' },
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '3' },
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '4' },
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '5' },
            { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '6' },
        ]);
    }, []);

    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>Lista de contatos</Text>
            <ContactList contacts={contacts} navigation={navigation} />
        </SafeAreaView>
    );
}
