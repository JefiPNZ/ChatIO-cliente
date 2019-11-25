import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Connect, SendMessage, OpenServer, Close } from '../Connection/ClientConnection';

export default ({ navigation }) => {

    const contact = navigation.getParam('contact', {});
    const ip = navigation.getParam('ip', '');
    // console.log('contato', contact,'ip', ip.substr(0,13));
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
        OpenServer(myIp, message => {
            const newMessage = GiftedChat.append(messages, message);
            setMessages([])
            setMessages([...newMessage]);
        });
    }, []);

    const handleMessage = data => {
        Connect(ip.substr(0, 13));
        const newMessage = GiftedChat.append(messages, data);
        setMessages([...newMessage]);
        const lastMessage = newMessage[0];
        console.log('mensagem enviada para ', ip.substr(0, 13))
        SendMessage(JSON.stringify({
            ...lastMessage,
            _id: Math.floor(Math.random(100000)),
            user: {
                _id: 2,
            }
        }),
            error => {
                console.log('erro', error)
                Alert.alert('Erro no envio, verifique sua conexão');
            });
        Close();
    };

    return (
        <GiftedChat messages={messages} user={{ _id: id }} onSend={handleMessage} />
    );
};