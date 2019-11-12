import React, {useState} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default ({})=>{
    const [messages, setMessages] = useState([]);

    return (
        <GiftedChat messages={messages}/>
    );
};