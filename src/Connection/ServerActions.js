import Server from './ServerConnection';

export default {
    writeMessage(message, ) {
        if(typeof text !== 'string'){
            Server.write(JSON.stringify(message)+"\n");
        }else{
            Server.write(text+"\n");
        }  
    },
    async awaitResponse(callback) {
        Server.on('data', data => {
            callback(data);
        });
    }
}