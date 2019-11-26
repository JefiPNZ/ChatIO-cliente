import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Connect, SendMessage, OpenServer, setClientIp } from '../Connection/ClientConnection';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Global from '../styles/Global';

export default ({ navigation }) => {

    const contact = navigation.getParam('contact', {});
    const ip = navigation.getParam('ip', '');
    const id = 1;

    const [messages, setMessages] = useState([
        /* {
             _id: 1, //id da mensagem
             createdAt: new Date(),
             text: 'oi chat tudo certo?',
             user: { //o outro usuário
                 _id: 2,
                 name: 'React Native',
                 avatar: 'https://placeimg.com/140/140/any',
             },
         }*/
    ]);

    useEffect(() => {
        OpenServer(message => {
            const m = messages;
            m.unshift(message);
            setMessages([])
            setMessages(m);
        });
    }, []);

    const handleMessage = message => {
        console.log('IP',ip)
        const operator = ip.indexOf(':');
        console.log('ip formatado', ip.substr(0,operator))
        setClientIp(ip.substr(0, operator));
        const newMessage = GiftedChat.append(messages, message);
        setMessages([...newMessage]);
        const lastMessage = newMessage[0];
        SendMessage(JSON.stringify({
            ...lastMessage,
            _id: Math.floor(Math.random(100000)),
            user: {
                _id: 2,
                avatar: 'https://placeimg.com/140/140/any',
            }
        }),
            error => {
                console.log('erro', error)
                Alert.alert('Erro no envio, verifique sua conexão');
            });
    };

    return (
        <>
            <TouchableOpacity style={Global.centeredButtonIcon} onPress={() => navigation.navigate('Contacts')}>
                <AwesomeIcon5 name="arrow-left" size={35} color="#ff5900" />
            </TouchableOpacity>
            <GiftedChat messages={messages} user={{ _id: id }} onSend={message => handleMessage(message)} />
        </>
    );
};