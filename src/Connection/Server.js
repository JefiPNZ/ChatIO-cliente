import TcpSocket from 'react-native-tcp-socket';
import BackgroundTimer from 'react-native-background-timer';
import { SUCCESS_MESSAGE, ERROR_MESSAGE, DATA_MESSAGE, CONNECTED_STATUS_MESSAGE, LOGOUT_MESSAGE } from './MessageTypes';

let dataFunction;
let Server;
let serverIp;

const Connect = () => {
  try {
    Server = TcpSocket.createConnection({
      host: serverIp,
      //  host: '10.42.0.1',
      port: 56000,
      interface: 'wifi',
    });

    if (!dataFunction) {
      dataFunction = data => { console.log(data.toString('utf8')) };
      Server.on('data', data => dataFunction(data.toString('utf8')));
    }

    Server.on('error', error => {
      console.log('erro na conexao do servidor', error);
      closeConnection();
    });

    Server.on('close', () => {
      console.log('Conexao com o servidor fechada');
      closeConnection();
    });

    BackgroundTimer.runBackgroundTimer(() => {
      sendData(CONNECTED_STATUS_MESSAGE, '', null, error => console.log('erro: ', error));
    },
      8000);
  } catch (error) {
    closeConnection();
    console.log('erro', error)
  }
}

export const updateServerIp = newIp => {
  serverIp = newIp;
};

export const closeConnection = () => {
  if (Server) {
    BackgroundTimer.stopBackgroundTimer();
    sendData(LOGOUT_MESSAGE, '', null, error => console.log(error));
    Server.destroy();
    Server = null;
    dataFunction = null;
  }
}

export const sendData = async (messageType = '', message, onSuccess, onError) => {
  try {
    if (!Server) {
      Connect();
    }
    dataFunction = response => {
      const message = response.match("([A-Z]+>?)(.*)");
      const status = message[1];
      const messageContent = message[2].trim().length > 0 ? JSON.parse(message[2]) : '';

      if (onError && status === 'Usuário já conectado...') {
        return onSuccess(messageContent)
      }
      if (onError && status === ERROR_MESSAGE) {
        closeConnection();
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
  } catch (error) {
    console.log('erro send data', error)
    closeConnection();
  }
}
