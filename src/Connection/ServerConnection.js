import TcpSocket from 'react-native-tcp-socket';

const ServerConnection = TcpSocket.createConnection({
  host: '192.168.2.151',
  port: 56000,
  interface: 'wifi',
});

export default ServerConnection;