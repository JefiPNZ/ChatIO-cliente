import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Connect, SendMessage, OpenServer, Close } from '../Connection/ClientConnection';

export default ({ navigation }) => {

    const [ContactConnection, setContactConn] = useState(null);
    const contact = navigation.getParam('contact', {});
    const ip = navigation.getParam('ip', '');
    console.log(contact, ip);
    const port = 56001;
    const id = 1;
    const myIp = '192.168.2.151';
    // 192.168.0.10238559

    const [messages, setMessages] = useState([
        {
            _id: 1, //id da mensagem
            createdAt: new Date(),
            text: 'oi chat tudo certo?',
            user: { //o outro usuário
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        }
    ]);

    useEffect(() => {
        OpenServer(myIp, message => { });
    }, []);

    const handleMessage = data => {
        Connect(contact.ip);
        const newMessage = GiftedChat.append(messages, data);
        setMessages([...newMessage]);
        const lastMessage = newMessage[0];
        console.log(messages)
        SendMessage(JSON.stringify({
            ...lastMessage,
            _id: Math.floor(Math.random(100000)),
            user: {
                _id: 2,
            }
        }),
            message => {
                setMessages(GiftedChat.append(messages, message));
            },
            error => {
                console.log('erro', error)
            });
        Close();
    };

    return (
        <GiftedChat messages={messages} user={{ _id: id }} onSend={handleMessage} />
    );
};