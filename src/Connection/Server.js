import TcpSocket from 'react-native-tcp-socket';
import BackgroundTimer from 'react-native-background-timer';
import { SUCCESS_MESSAGE, ERROR_MESSAGE, DATA_MESSAGE, CONNECTED_STATUS_MESSAGE } from './MessageTypes';

const Server = TcpSocket.createConnection({
  host: '192.168.0.100',
  //  host: '192.168.2.151',
  port: 56000,
  interface: 'wifi',
});

BackgroundTimer.runBackgroundTimer(() => {
  sendData(CONNECTED_STATUS_MESSAGE, '', null, error => console.log('erro: ',error));
},
  5000);

export const sendData = async (messageType = '', message, onSuccess, onError) => {

  if (typeof message !== 'string') {
    await Server.write(messageType + JSON.stringify(message) + "\n");
  } else {
    await Server.write(messageType + message + "\n");
  }

  await Server.on('data', data => {
    const message = data.toString('utf8').match("([A-Z]+>?)(.*)");
    const status = message[1];
    const messageContent = message[2].trim().length > 0 ? JSON.parse(message[2]) : '';

    if (onError && status === ERROR_MESSAGE) {
      return onError(messageContent)
    } else if (onSuccess && (status === SUCCESS_MESSAGE || status === DATA_MESSAGE)) {
      return onSuccess(messageContent);
    }
  });
}
