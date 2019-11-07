import React, { useState, useEffect } from 'react';
import TcpSocket from 'react-native-tcp-socket';

export default () => {
    const [messages, setMessages] = useState([]);
  
      const ServerConnection = TcpSocket.createConnection({
        host: '192.168.2.151',
        port: 56000,
        interface: 'wifi',
      });
  
      ServerConnection.on('data', data => {
        console.log('message was received', data.toString('utf8'));
        ServerConnection.write("Hello server!"+"\n");
        
        const aux = messages;     
        aux.push(data.toString('utf8')); 
        setMessages(aux);
      });  
      ServerConnection.on('error', function (error) {
        console.log(error);
      });
      ServerConnection.on('close', function () {
        console.log('Connection closed!');  
      });

      export default ServerConnection;
   
  };