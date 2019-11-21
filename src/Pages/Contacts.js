import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Alert } from 'react-native';
import ContactList from '../components/ContactList';
import GlobalStyles from '../styles/Global'
import { sendData } from '../Connection/Server';
import { GET_CONTACT_LIST_MESSAGE } from '../Connection/MessageTypes';

export default ({ navigation }) => {

    const [showModal, handleModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState({});
    
    const refreshContacts = () => {
        sendData(GET_CONTACT_LIST_MESSAGE, '',
            data => {
                console.log('data', data);
                setContacts(data);
            },
            error => {
                Alert.alert(
                    'Erro na busca dos contatos',
                    error.message,
                    [
                        { text: 'OK' }
                    ]
                )
            });

    }
    const handleRemoveContact = () => {
        const { nickname } = selectedContact;
        sendData(REMOVE_CONTACT_MESSAGE, { nickname },
            data => {
                Alert.alert(
                    'Usuário removido com sucesso',
                    [
                        { text: 'Ok' }
                    ]
                );
            },
            error => {
                Alert.alert(
                    'Erro ao deletar o contato',
                    error.message,
                    [
                        { text: 'Ok' }
                    ]
                );
            });
        handleModal(!showModal);
    };

    const handleOpenModal = (contact) => {
        setSelectedContact(contact);
        handleModal(true);
    }

    useEffect(refreshContacts, []);

    return (
        <>
            <Modal visible={showModal} transparent>
                <View style={Styles.modal}>
                    <View style={Styles.modalContainer}>
                        <Text style={Styles.modalText}>
                            Você realmente deseja excluir este contato?
                        </Text>
                        <View style={Styles.modalButtonContainer}>
                            <TouchableOpacity onPress={() => handleModal(!showModal)} style={Styles.modalCloseButton}>
                                <Text style={Styles.modalButtonText}>
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleRemoveContact} style={Styles.modalDeleteButton}>
                                <Text style={Styles.modalButtonText}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <SafeAreaView style={GlobalStyles.paddingView}>
                <Text style={GlobalStyles.header}>Lista de contatos</Text>
                <ContactList contacts={contacts} navigation={navigation} refreshContacts={refreshContacts} handleOpenModal={handleOpenModal}/>
            </SafeAreaView>
        </>
    );
}
