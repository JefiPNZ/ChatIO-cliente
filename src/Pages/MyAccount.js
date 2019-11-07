import React from 'react';
import { Text, TouchableOpacity, SafeAreaView} from 'react-native';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';

export default ({ navigation }) => {

    const handleSubmit = () => {

    };

    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>
                Meus dados
            </Text>
            <UserForm />
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSubmit}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Salvar alterações
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};