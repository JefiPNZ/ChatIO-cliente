import React, { useState } from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';
import ServerActions from '../Connection/ServerActions';

export default ({ navigation }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        birthDate: '',
    });

    const handleChange = (text, name) => {
        const aux = { ...user };
        aux[name] = text;
        setUser(aux);
    };

    const handleBack = () => {
        navigation.navigate('Login');
    };
    const handleSubmit = () => {
        console.log(user);
        ServerActions.writeMessage(user);
        navigation.navigate('Contacts');
        setUser({
            name: '',
            email: '',
            password: '',
            birthDate: '',
        });
    };
    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>
                Cadastre-se
            </Text>
            <UserForm handleChange={handleChange} user={user} />
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