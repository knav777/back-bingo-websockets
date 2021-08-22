/**
 * Class with sockets funcionality
 * 
 * @author knav777
 */
class bingoSocket{

    constructor(){

        this.last_error = null;
    }

    start(){

        try {

            const io = this.socket( this.server );
            this.io = io;

            return true;
            
        } catch ( error ) {

            this.last_error = "ERROR: " + error.message;
            return null;
        }
    }

    actionOne( data ){
        this.io.sockets.emit('chat:message', data);
    }

    setSocket( socket ){

        this.socket = socket;
    }

    setServer( server ){

        this.server = server;
    }

    getLastError(){

        return this.last_error;
    }
}

module.exports = new bingoSocket();