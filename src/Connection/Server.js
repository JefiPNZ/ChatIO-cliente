import TcpSocket from 'react-native-tcp-socket';
import { SUCCESS_MESSAGE, ERROR_MESSAGE, DATA_MESSAGE } from './MessageTypes';

const Server = TcpSocket.createConnection({
  host: '192.168.2.151',
  port: 56000,
  interface: 'wifi',
});

export const sendData = async (messageType = '', message, onSuccess, onError) => {

  if (typeof message !== 'string') {
    await Server.write(messageType + JSON.stringify(message) + "\n");
  } else {
    await Server.write(messageType + message + "\n");
  }

  await Server.on('data', data => {
    const message = data.toString('utf8').match("([A-Z]+>?)(.*)");
    const status = message[1];
    const messageContent = JSON.parse(message[2]);

    if (onError && status === ERROR_MESSAGE) {
      onError(messageContent)
    } else if (onSuccess && (status === SUCCESS_MESSAGE || status === DATA_MESSAGE)) {
      onSuccess(messageContent);
    }
  });
}
