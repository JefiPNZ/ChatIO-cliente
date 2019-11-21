import TcpSocket from 'react-native-tcp-socket';
import BackgroundTimer from 'react-native-background-timer';
import { SUCCESS_MESSAGE, ERROR_MESSAGE, DATA_MESSAGE, CONNECTED_STATUS_MESSAGE } from './MessageTypes';

let dataFunction;
const Server = TcpSocket.createConnection({
 // host: '10.15.32.198',
  host: '192.168.2.151',
  port: 56000,
  interface: 'wifi',
});

if (!dataFunction) {
  dataFunction = data => { console.log(data.toString('utf8')) };
  Server.on('data', data => dataFunction(data.toString('utf8')));
}

BackgroundTimer.runBackgroundTimer(() => {
  sendData(CONNECTED_STATUS_MESSAGE, '', null, error => console.log('erro: ', error));
},
  8000);

export const sendData = async (messageType = '', message, onSuccess, onError) => {

  dataFunction = response => {
    const message = response.match("([A-Z]+>?)(.*)");
    const status = message[1];
    console.log(message[2])
    const messageContent = message[2].trim().length > 0 ? JSON.parse(message[2]) : '';

    if (onError && status === ERROR_MESSAGE) {
      return onError(messageContent)
    } else if (onSuccess && (status === SUCCESS_MESSAGE || status === DATA_MESSAGE)) {
      return onSuccess(messageContent);
    }
  };

  if (typeof message !== 'string') {
    await Server.write(messageType + JSON.stringify(message) + "\n");
  } else {
    await Server.write(messageType + message + "\n");
  }

}
