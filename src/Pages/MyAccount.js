import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';
import { sendData } from '../Connection/Server';
import { ALTER_USER_MESSAGE, GET_USER_DATA } from '../Connection/MessageTypes';
import Global from '../styles/Global';
export default ({ navigation }) => {

    const [user, setUser] = useState({
        nickname: '',
        password: '',
        email: '',
        birthDate: '',
    });

    useEffect(()=>{
        sendData(GET_USER_DATA, '',
        data => {
            setUser({ ...data, password: '' })
        },
        error => {
            Alert.alert(
                'Erro',
                error.message,
                [{ text: 'OK' }]
            );
        });
    }, []);

    const handleRefresh = ()=>{
        sendData(GET_USER_DATA, '',
        data => {
            setUser({ ...data, password: '' })
        },
        error => {
            Alert.alert(
                'Erro',
                error.message,
                [{ text: 'OK' }]
            );
        });
    };

    const handleSubmit = () => {
        const {nickname, password, email, birthDate} = user;
        if(nickname.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0 || birthDate.trim().length === 0){
            return Alert.alert('Preencha todos os campos');
        }
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
            <TouchableOpacity style={Global.centeredButtonIcon} onPress={handleRefresh}>
                <Icon name="reload" color="#ff5900" size={35}/>
            </TouchableOpacity>
            <UserForm setUser={setUser} user={user} edit/>
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSubmit}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Salvar alterações
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};