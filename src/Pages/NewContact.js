import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../styles/Global';
import Styles from '../styles/S.NewContact';

export default ({ }) => {

    const [user, setUser] = useState('');

    const handleInvite = () => {

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
                    onChangeText={text => setUser(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user}
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