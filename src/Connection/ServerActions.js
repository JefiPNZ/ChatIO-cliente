import Server from './ServerConnection';

export default {
    writeMessage(message, messageType = '') {
        if(typeof message !== 'string'){
            Server.write(messageType+JSON.stringify(message)+"\n");
        }else{
            Server.write(messageType+message+"\n");
        }  
    },
    async awaitResponse(callback) {
        Server.on('data', data => {
            callback(data);
        });
    }
}