import React, { useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Styles from '../styles/S.ContactList';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { sendData } from '../Connection/Server';
import { REMOVE_CONTACT_MESSAGE } from '../Connection/MessageTypes';

export default ({ contacts, navigation, refreshContacts }) => {
    const [showModal, handleModal] = useState(false);
    const [refresh, setRefreshing] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const handleMessageContact = (contact, ip) => {
        navigation.navigate('Chat', { contact, ip });
    };
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

    const selectArchive = async () => {
        const response = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });

        console.log(response)//name, size, type, uri

        RNFetchBlob.fs.readFile(response.uri, 'base64', 4095).then(data => {
            console.log(data)
            //console.log('convertion sucess')
        }).catch(error => console.log(error));

        handleModal(!showModal);
    }

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
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={() => {
                        setRefreshing(true);
                        refreshContacts();
                        setRefreshing(false)
                    }}
                    />
                }
                data={contacts}
                renderItem={contacts => {
                    const { contact, ip, online } = contacts.item;
                    console.log(contact)
                    return (
                        <View style={Styles.container} key={contact.id}>
                            <View style={Styles.iconContainer}>
                                {online ? (
                                    <TouchableOpacity onPress={() => handleMessageContact(contact, ip)}>
                                        <AwesomeIcon5 style={Styles.icon} name="comment-dots" size={25} color="#000" />
                                    </TouchableOpacity>
                                ) : (
                                        <AwesomeIcon name="close" style={Styles.icon} size={25} color="#000" />
                                    )}
                                <TouchableOpacity onPress={() => handleOpenModal(contact)}>
                                    <AwesomeIcon5 style={Styles.icon} name="user-minus" size={25} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.textContainer}>
                                <Text style={Styles.contactName}>{contact.nickname}</Text>
                                <Text style={Styles.contactDescription}>{contact.email}</Text>
                                <Text style={Styles.contactDescription}>{contact.birthDate}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </>
    );
};