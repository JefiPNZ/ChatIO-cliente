import React, { useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity } from 'react-native';
import Styles from '../styles/S.ContactList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default ({ contacts }) => {
    const [showModal, handleModal] = useState(false);

    const handleMessageContact = () => {
        handleModal(!showModal);
    };
    const handleRemoveContact = (contactId) => {
        handleModal(!showModal);
    };

    const selectArchive = async()=>{
        const response = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });

        console.log(response)//name, size, type, uri
        RNFetchBlob.fs.readFile(response.uri, 'base64').then(data =>{
           // console.log(data)
            console.log('convertion sucess')
        })
        handleModal(!showModal);
    }

    return (
        <>
            <Modal visible={showModal}>
                <View>
                <TouchableOpacity onPress={()=>selectArchive()} style={{height: 500, width: '100%', backgroundColor: '#ff1599'}}>
                    <Text>Fechar</Text>
                </TouchableOpacity>
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
                                <TouchableOpacity onPress={() => handleRemoveContact(item.id)}>
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