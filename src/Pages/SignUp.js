import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { CREATE_USER_MESSAGE } from '../Connection/MessageTypes';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';
import { sendData } from '../Connection/Server';

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
        sendData(CREATE_USER_MESSAGE, user,
            () => {
                navigation.navigate('Login');
                setUser({
                    nickname: '',
                    email: '',
                    password: '',
                    birthDate: '',
                });
            }, error => Alert.alert(
                'Erro no cadastro, não era para eu aparecer aqui',
                error.message,
                [
                    { text: 'Ok' },
                ]
            ));
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