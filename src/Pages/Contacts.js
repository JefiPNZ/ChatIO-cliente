import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Alert, Modal, View } from 'react-native';
import ContactList from '../components/ContactList';
import GlobalStyles from '../styles/Global'
import { sendData } from '../Connection/Server';
import { GET_CONTACT_LIST_MESSAGE, REMOVE_CONTACT_MESSAGE } from '../Connection/MessageTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Styles from '../styles/S.ContactsPage';
import Dialog from 'react-native-dialog';

export default ({ navigation }) => {

    const [showModal, handleModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState({});

    const refreshContacts = () => {
        sendData(GET_CONTACT_LIST_MESSAGE, '',
            data => {
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
        const { nickname, id } = selectedContact;
        sendData(REMOVE_CONTACT_MESSAGE, { nickname },
            () => {
                Alert.alert(
                    'Usuário removido com sucesso',
                    [
                        { text: 'Ok' }
                    ]
                );
                setContacts(contacts.filter(contact => contact.id != id));
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
        handleModal(false);
    };

    const handleOpenModal = (contact) => {
        setSelectedContact(contact);
        handleModal(true);
    }

    useEffect(refreshContacts, []);

    return (
        <>
            <Dialog.Container visible={showModal}>
                <Dialog.Title>Excluir Contato</Dialog.Title>
                <Dialog.Description>
                    Você realmente deseja excluir o contato {selectedContact.nickname} ?
                </Dialog.Description>
                <Dialog.Button label="Voltar" onPress={() => handleModal(!showModal)} />
                <Dialog.Button label="Excluir" onPress={handleRemoveContact} />
            </Dialog.Container>

            <SafeAreaView style={GlobalStyles.paddingView}>
                <Text style={GlobalStyles.header}>Lista de contatos</Text>
                {contacts.length === 0 ? (
                    <>
                        <Text style={Styles.emptyContactsMessage}>Parece que você não possuí nenhum contato</Text>
                        <TouchableOpacity style={Styles.emptyContactsButton} onPress={refreshContacts}>
                            <Text style={Styles.emptyContactsButtonText}>Clique aqui para atualizar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                        <>
                            <ContactList contacts={contacts} navigation={navigation} refreshContacts={refreshContacts} handleOpenModal={handleOpenModal} />
                        </>
                    )}
            </SafeAreaView>
        </>
    );
}
