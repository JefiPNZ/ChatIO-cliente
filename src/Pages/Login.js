import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Styles from '../styles/S.Login';
import GlobalStyles from '../styles/Global';
import ServerActions from '../Connection/ServerActions';

export default ({ navigation }) => {

    const [login, setLogin] = useState({ name: '', password: '' });
    const [contacts, setContacts] = useState([]);

    const handleSubmit = () => {
        ServerActions.writeMessage(login);
        ServerActions.awaitResponse(data => {
            console.log('message was received', JSON.parse(data.toString('utf8')));
            setContacts(JSON.parse(data.toString('utf8')))
        });
        navigation.navigate('Contacts', {
            contacts: [
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '0' },
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '1' },
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '2' },
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '3' },
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '4' },
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '5' },
                { name: 'Daiarino da Silva', email: 'email@email.com', birthDate: '1998', id: '6' },
            ]
        });

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