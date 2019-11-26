import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import Styles from '../styles/S.UserForm';

export default ({ setUser, user, edit }) => {

    const handleChange = (text, name) => {
        const aux = { ...user };
        aux[name] = text;
        setUser(aux);
    };

    return (
        <SafeAreaView >
            <View style={Styles.container}>
                <Text style={Styles.label}>Usuário</Text>
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.nickname : ''}
                    onChangeText={text => handleChange(text, "nickname")}
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
                {edit ?
                    <Text style={Styles.label}>Confirme sua senha</Text>
                    :
                    <Text style={Styles.label}>Senha</Text>
                }
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.password : ''}
                    onChangeText={text => handleChange(text, "password")}
                    secureTextEntry={true}
                />

                <Text style={Styles.label}>
                    Ano de Nascimento
                </Text>
                <TextInput style={Styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user ? user.birthDate : ''}
                    onChangeText={text => handleChange(text, "birthDate")}
                    keyboardType="numeric"
                />
            </View>
        </SafeAreaView>
    );
}