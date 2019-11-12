import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';
import UserForm from '../components/UserForm';
import GlobalStyles from '../styles/Global';
import ServerActions from '../Connection/ServerActions';

export default ({ navigation }) => {

    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        birthDate: '',
    });

    useEffect(()=>{
        ServerActions.writeMessage('manda o meus dados');
        ServerActions.awaitResponse(data =>{
            const response = JSON.parse(data.toString('utf8'));
            setUser(response);
        });
    },[]);

    const handleSubmit = () => {
        ServerActions.writeMessage('atualiza meus dados');
        ServerActions.awaitResponse(data =>{
            // TODO
        });
    };

    return (
        <SafeAreaView style={GlobalStyles.paddingView}>
            <Text style={GlobalStyles.header}>
                Meus dados
            </Text>
            <UserForm setUser={setUser} user={user}/>
            <TouchableOpacity style={GlobalStyles.formButton} onPress={handleSubmit}>
                <Text style={GlobalStyles.formButtonLabel}>
                    Salvar alterações
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};