import TcpSocket from 'react-native-tcp-socket';

const Server = TcpSocket.createConnection({
  host: '192.168.2.151', //151         
  port: 56000,
  interface: 'wifi',
});

export const sendData = async (message, messageType = '', callback) => {
  if (typeof message !== 'string') {
    await Server.write(messageType + JSON.stringify(message) + "\n");
  } else {
    await Server.write(messageType + message + "\n");  
  }
  if(callback){
    await Server.on('data', data => callback(data.toString('utf8')));
  }
}
