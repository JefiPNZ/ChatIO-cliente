import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../styles/Global';
import Styles from '../styles/S.NewContact';
import ServerActions from '../Connection/ServerActions';
import {ADD_CONTACT_MESSAGE} from '../Connection/MessageTypes';

export default ({ }) => {

    const [nickname, setNickname] = useState('');

    const handleInvite = () => {
        ServerActions.writeMessage(nickname, ADD_CONTACT_MESSAGE);
        setNickname('');
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