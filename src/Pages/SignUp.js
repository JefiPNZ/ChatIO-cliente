import React from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';

export default ({ navigation }) => {

    const handleBack = () => {
        navigation.navigate('Login');
    };
    const handleSubmit = () => {
        navigation.navigate('Contacts');
    };
    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>
                Cadastre-se
            </Text>
            <UserForm />
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSubmit}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Cadastrar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleBack}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Voltar
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}