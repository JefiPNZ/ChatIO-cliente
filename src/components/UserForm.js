import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import Styles from '../styles/S.UserForm';

export default () => {
    return (
        <SafeAreaView >
            <View style={Styles.container}> 
                <Text style={Styles.label}>Usuário</Text>
                <TextInput style={Styles.input} autoCapitalize="none" autoCorrect={false} />
                <Text style={Styles.label}>Email</Text>
                <TextInput style={Styles.input} autoCapitalize="none" autoCorrect={false} />
                <Text style={Styles.label}>Senha</Text>
                <TextInput style={Styles.input} autoCapitalize="none" autoCorrect={false} />
                <Text style={Styles.label}>Ano de Nascimento</Text>
                <TextInput style={Styles.input} autoCapitalize="none" autoCorrect={false} />
            </View>
        </SafeAreaView>
    );
}