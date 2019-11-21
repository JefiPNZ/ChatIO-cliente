import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';
import { sendData } from '../Connection/Server';
import { ALTER_USER_MESSAGE, GET_USER_DATA } from '../Connection/MessageTypes';

export default ({ navigation }) => {

    const [user, setUser] = useState({
        nickname: '',
        password: '',
        email: '',
        birthDate: '',
    });

    useEffect(() => {
        sendData(GET_USER_DATA, '',
            data => {
                setUser({ ...data })
            },
            error => {
                Alert.alert(
                    'Erro',
                    error.message,
                    [{ text: 'OK' }]
                );
            });
    }, []);

    const handleSubmit = () => {
        sendData(ALTER_USER_MESSAGE, user,
            () => {
                Alert.alert(
                    'Sucesso',
                    'Os seus dados foram alterados com sucesso',
                    [{ text: 'Ok' }]
                );
                setUser({
                    nickname: '',
                    password: '',
                    email: '',
                    birthDate: '',
                });
            },
            error => {
                Alert.alert(
                    'Erro',
                    error.message,
                    [{ text: 'OK' }]
                );
            });
    };
    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>
                Meus dados
            </Text>
            <UserForm setUser={setUser} user={user} />
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSubmit}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Salvar alterações
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};