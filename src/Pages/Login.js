import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Styles from '../styles/S.Login';
import GlobalStyles from '../styles/Global';
import { sendData, closeConnection, updateServerIp } from '../Connection/Server';
import { LOGIN_MESSAGE } from '../Connection/MessageTypes';
import Dialog from 'react-native-dialog';

export default ({ navigation }) => {

    const [login, setLogin] = useState({ nickname: '', password: '' });
    const [serverIp, setServerIp] = useState('');
    const [showPopup, setPopup] = useState(true);

    useEffect(() => {
        closeConnection();
    }, []);

    const handleSubmit = () => {
        sendData(LOGIN_MESSAGE, login,
            () => {
                setLogin({ nickname: '', password: '' });
                navigation.navigate('Contacts');
            },
            error => {
                Alert.alert(
                    'Erro no login',
                    error.message,
                    [
                        { text: 'OK' }
                    ]
                );
            });
    }
    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

    const handleChange = (text, name) => {
        const aux = { ...login };
        aux[name] = text;
        setLogin(aux);
    };

    const handleIp = text => {
        setServerIp(text);
    }

    const closePopup = () => {
        setPopup(false);
    }

    const handleConfiguration = ()=>{
        updateServerIp(serverIp);
        closePopup();
    }

    return (
        <>
            <Dialog.Container visible={showPopup}>
                <Dialog.Title>Configurar Ip</Dialog.Title>
                <Dialog.Description>
                    Adicione o Ip do servidor aqui
          </Dialog.Description>
                <Dialog.Input
                style={Styles.popupInput}
                    onChangeText={text => handleIp(text)}
                    value={serverIp}
                />
                {/*<Dialog.Button label="Cancelar" onPress={closePopup}/>*/}
                <Dialog.Button label="Concluir" onPress={handleConfiguration}/>
            </Dialog.Container>


            <SafeAreaView style={Styles.formContainer}>
                <View style={Styles.titleContainer}>
                    <Text style={Styles.title}>
                        Bate-papo UAL
                </Text>
                </View>
                <View style={Styles.inputContainer}>
                    <Text style={Styles.label}>
                        Login
                </Text>
                    <TextInput style={Styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={login.nickname}
                        onChangeText={text => handleChange(text, 'nickname')}
                    />
                    <Text style={Styles.label}>
                        Senha
                </Text>
                    <TextInput style={Styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={login.password}
                        onChangeText={text => handleChange(text, 'password')}
                    />
                </View>
                <View style={Styles.buttonContainer}>
                    <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSubmit}>
                        <Text style={GlobalStyles.formButtonLabel}>
                            Entrar
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSignUp}>
                        <Text style={GlobalStyles.formButtonLabel}>
                            Cadastro
                    </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}