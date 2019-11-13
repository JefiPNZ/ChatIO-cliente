import React, { useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity } from 'react-native';
import Styles from '../styles/S.ContactList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ServerActions from '../Connection/ServerActions';
import { REMOVE_CONTACT_MESSAGE } from '../Connection/MessageTypes';

export default ({ contacts, navigation }) => {
    const [showModal, handleModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const handleMessageContact = () => {
        navigation.navigate('Chat');
    };
    const handleRemoveContact = () => {
        const { id } = selectedContact;
        ServerActions.writeMessage(id, REMOVE_CONTACT_MESSAGE);
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
                data={contacts}
                renderItem={contact => {
                    const { item } = contact;
                    return (
                        <View style={Styles.container} key={item.id}>
                            <View style={Styles.iconContainer}>
                                <TouchableOpacity onPress={handleMessageContact}>
                                    <Icon style={Styles.icon} name="comment-dots" size={25} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleOpenModal(item)}>
                                    <Icon style={Styles.icon} name="user-minus" size={25} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.textContainer}>
                                <Text style={Styles.contactName}>{item.name}</Text>
                                <Text style={Styles.contactDescription}>{item.email}</Text>
                                <Text style={Styles.contactDescription}>{item.birthDate}</Text>
                            </View>
                        </View>
                    )
                }} />
        </>
    );
};