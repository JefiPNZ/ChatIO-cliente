import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default ({ }) => {
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

    const handleMessage = data => {
        setMessages(GiftedChat.append(messages, data));
    };

    return (
        <GiftedChat messages={messages} user={{ _id: 1 }} onSend={handleMessage} />
    );
};