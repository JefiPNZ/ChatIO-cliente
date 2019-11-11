import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import Styles from '../styles/S.UserForm';

export default ({ handleChange, user }) => {
    return (
        <SafeAreaView >
            <View style={Styles.container}>
                <Text style={Styles.label}>Usuário</Text>
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.name : ''}
                    onChangeText={text => handleChange(text, "name")}
                />
                <Text style={Styles.label}>
                    Email
                </Text>
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.email : ''}
                    onChangeText={text => handleChange(text, "email")}
                />
                <Text style={Styles.label}>
                    Senha
                </Text>
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.password : ''}
                    onChangeText={text => handleChange(text, "password")}
                />
                <Text style={Styles.label}>
                    Ano de Nascimento
                </Text>
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.birthDate : ''}
                    onChangeText={text => handleChange(text, "birthDate")}
                />
            </View>
        </SafeAreaView>
    );
}