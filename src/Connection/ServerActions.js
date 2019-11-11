import Server from './ServerConnection';

export default {
    writeMessage(message) {
        if(typeof text !== 'string'){
            return Server.write(JSON.stringify(message));
        }
        return Server.write(text);
    },
    async awaitResponse() {
        Server.on('data', data => {
            console.log('message was received', JSON.parse(data.toString('utf8')));
        });
    }
}