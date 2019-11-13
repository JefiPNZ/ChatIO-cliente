import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Styles from '../styles/S.Login';
import GlobalStyles from '../styles/Global';
import {sendData} from '../Connection/Server';
import { LOGIN_MESSAGE } from '../Connection/MessageTypes';

export default ({ navigation }) => {
 
    const [login, setLogin] = useState({ name: '', password: '' });

    const handleSubmit = () => {
        sendData(login, LOGIN_MESSAGE, data =>{
            console.log(data);
        });
        navigation.navigate('Contacts');

        setLogin({ name: '', password: '' });
    }
    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

    const handleChange = (text, name) => {
        const aux = { ...login };
        aux[name] = text;
        setLogin(aux);
    };

    return (
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
                    value={login.name}
                    onChangeText={text => handleChange(text, 'name')}
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
    );
}