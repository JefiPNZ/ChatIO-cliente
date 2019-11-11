import { useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';

const [usersConnections, setConnections] = useState([]);

const connect = (host, port) => {
    const clientConnection = TcpSocket.connect({host, port});
    const auxConnections = [...usersConnections];
    auxConnections[host] = clientConnection;
    setConnections(auxConnections);
}

const getConnection = host => usersConnections[host];

export default {connect, getConnection}