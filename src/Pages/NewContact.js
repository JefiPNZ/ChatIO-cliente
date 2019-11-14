import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import GlobalStyles from '../styles/Global';
import Styles from '../styles/S.NewContact';
import { sendData } from '../Connection/Server';
import { ADD_CONTACT_MESSAGE } from '../Connection/MessageTypes';

export default ({ }) => {

    const [nickname, setNickname] = useState('');

    const handleInvite = () => {
        sendData(ADD_CONTACT_MESSAGE, nickname,
            data => {
                // TODO tratar a adição do contato
                setNickname('');
            },
            error => {
                Alert.alert(
                    'Erro ao adicionar o contato',
                    error.message,
                    [
                        { text: 'OK' }
                    ]
                );
            });
    }

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={GlobalStyles.header}>
                Adicionar contato
            </Text>
            <View style={Styles.formContainer}>
                <Text>
                    Nome do usuário
                </Text>
                <TextInput
                    style={Styles.input}
                    onChangeText={text => setNickname(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={nickname}
                />
            </View>
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleInvite}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Enviar Convite
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}