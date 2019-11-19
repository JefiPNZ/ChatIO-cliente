import React, { useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Styles from '../styles/S.ContactList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { sendData } from '../Connection/Server';
import { REMOVE_CONTACT_MESSAGE } from '../Connection/MessageTypes';

export default ({ contacts, navigation, refreshContacts }) => {
    const [showModal, handleModal] = useState(false);
    const [refresh, setRefreshing] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const handleMessageContact = (contact, ip) => {
        navigation.navigate('Chat', { contact, ip});
    };
    const handleRemoveContact = () => {
        const { id } = selectedContact;
        sendData(REMOVE_CONTACT_MESSAGE, id,
            () => {
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
                renderItem={contact => {
                    const { user, ip, online } = contact.item;
                    console.log(user)
                    return (
                        <View style={Styles.container} key={user.id}>
                            <View style={Styles.iconContainer}>
                                <TouchableOpacity onPress={() => handleMessageContact(user, ip)}>
                                    <Icon style={Styles.icon} name="comment-dots" size={25} color={online ? '#00D617' : '#D60000'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleOpenModal(user)}>
                                    <Icon style={Styles.icon} name="user-minus" size={25} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.textContainer}>
                                <Text style={Styles.contactName}>{user.nickname}</Text>
                                <Text style={Styles.contactDescription}>{user.email}</Text>
                                <Text style={Styles.contactDescription}>{user.birthDate}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </>
    );
};