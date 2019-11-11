import React, {useState} from 'react';
import {Text} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default ({})=>{
    const [messages, setMessages] = useState(['teste', '123', 'beleza']);

    return (
        <GiftedChat messages={messages}/>
    );
};