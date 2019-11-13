import React, { useState } from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';
import { sendData } from '../Connection/Server';
import { CREATE_USER_MESSAGE } from '../Connection/MessageTypes';

export default ({ navigation }) => {

    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
        birthDate: '',
    });

    const handleBack = () => {
        navigation.navigate('Login');
    };
    const handleSubmit = () => {
        sendData(user, CREATE_USER_MESSAGE, data => {
            console.log(data);
        });
        navigation.navigate('Login');
        setUser({
            nickname: '',
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
            <UserForm setUser={setUser} user={user} />
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