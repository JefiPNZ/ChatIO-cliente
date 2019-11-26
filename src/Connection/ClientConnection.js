import TcpSocket from 'react-native-tcp-socket';

const CHAT_PORT = 56001;
let ClientConn;
let Server;
let clientHost;

export const Connect = host => {
    if (!ClientConn) {
        clientHost = host;
        ClientConn = TcpSocket.connect({ host, port: CHAT_PORT });
        ClientConn.on('error', error => console.log(error));
    }
}

export const Close = () => {
   // ClientConn.destroy();
   //  ClientConn = null;
} 

export const OpenServer = (onMessageReceived) => {
    Server = TcpSocket.createServer(socket => {
        socket.on('data', data => {
            const message = data.toString('utf8');
            if (onMessageReceived) {
                onMessageReceived(JSON.parse(message));
            }
        });

        socket.on('error', (error) => {
            console.log('An error ocurred with ClientConn socket ', error);
        });

        socket.on('close', (error) => {
            console.log('Closed connection with ', socket.address());
        });
    }).listen(CHAT_PORT);

    Server.on('data', data => {
        const message = data.toString('utf8');
        if (onMessageReceived) {
            onMessageReceived(JSON.parse(message));
        }
    });
};  

export const SendMessage = async (message, onError) => {
    if(!ClientConn){
        Connect(clientHost);
    }
    if (typeof message !== 'string') {
        await ClientConn.write(JSON.stringify(message) + "\n");
    } else {
        await ClientConn.write(message + "\n");
    }
}
