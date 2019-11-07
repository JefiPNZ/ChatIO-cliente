import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Styles from '../styles/S.Login';
import GlobalStyles from '../styles/Global';

export default ({ navigation }) => {

    const handleSubmit = () => {
        navigation.navigate('Contacts');
    }
    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

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
                <TextInput style={Styles.input} autoCapitalize="none" autoCorrect={false} />
                <Text style={Styles.label}>
                    Senha
                    </Text>
                <TextInput style={Styles.input} autoCapitalize="none" autoCorrect={false} />
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