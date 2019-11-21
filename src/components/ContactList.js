import React, { useState } from 'react';
import { FlatList, Text, View, Modal, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Styles from '../styles/S.ContactList';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import DocumentPicker from 'react-native-document-picker';
// import RNFetchBlob from 'rn-fetch-blob';

export default ({ contacts, navigation, refreshContacts, handleOpenModal }) => {
    const [refresh, setRefreshing] = useState(false);

    const handleMessageContact = (contact, ip) => {
        navigation.navigate('Chat', { contact, ip });
    };
    /*
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
    */
    return (
        <>
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
                                        <AwesomeIcon name="close" style={Styles.icon} size={35} color="#000" />
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