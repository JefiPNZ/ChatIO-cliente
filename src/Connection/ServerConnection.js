import TcpSocket from 'react-native-tcp-socket';

const ServerConnection = TcpSocket.createConnection({
  host: '127.0.0.1', //151         
  port: 56000,
  interface: 'wifi',
});
  
export default ServerConnection;