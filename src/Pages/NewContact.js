import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/Global';

export default ({ }) => {

    const [user, setUser] = useState('');

    const handleInvite = () => {

    }

    return (
        <SafeAreaView>
            <Text style={GlobalStyles.header}>
                Adicionar contato
            </Text>
            <View style={GlobalStyles.paddingView}>
                <Text>
                    Nome do usuário
                </Text>
                <TextInput
                    onChangeText={text => setUser(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user}
                />
                <TouchableOpacity style={GlobalStyles.formButton} onPress={handleInvite}>
                    <Text style={GlobalStyles.formButtonLabel}>
                        Enviar Convite
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}