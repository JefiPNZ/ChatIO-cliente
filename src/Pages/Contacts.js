import React from 'react';
import { Text, SafeAreaView, View, StatusBar, List } from 'react-native';
import ContactList from '../components/ContactList';
import Styles from '../styles/S.ContactsPage';
import GlobalStyles from '../styles/Global';


export default () => {

    return (
        <SafeAreaView style={GlobalStyles.paddingView}>  
            <Text style={GlobalStyles.header}>Lista de contatos</Text>
            <ContactList/>
        </SafeAreaView>
    );
}
