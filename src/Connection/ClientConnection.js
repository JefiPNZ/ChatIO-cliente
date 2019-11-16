import TcpSocket from 'react-native-tcp-socket';

const CHAT_PORT = 56001;
let ClientConn;
let Server;

export const Connect = host => {
    ClientConn = TcpSocket.connect({ host, port: CHAT_PORT });
}

export const Close = () => ClientConn.destroy();

export const OpenServer = (host, onMessageReceived) => {
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
    }).listen(CHAT_PORT, host);
};

export const SendMessage = async (message, onSuccess, onError) => {
    if (typeof message !== 'string') {
        await ClientConn.write(JSON.stringify(message) + "\n");
    } else {
        await ClientConn.write(message + "\n");
    }
    await ClientConn.on('data', data => {
        const message = data.toString('utf8');
        if (onSuccess) {
            console.log(message);
            onSuccess(JSON.parse(message));
        }
    });

    ClientConn.on('error', error => onError ? onError(error) : null);
}
