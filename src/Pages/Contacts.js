import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import ContactList from '../components/ContactList';
import GlobalStyles from '../styles/Global';

export default ({navigation}) => {
    return (
        <SafeAreaView style={GlobalStyles.paddingView}>  
            <Text style={GlobalStyles.header}>Lista de contatos</Text>
            <ContactList contacts={navigation.getParam('contacts', [])}/>
        </SafeAreaView>
    );
}
