/**
 *  Class of server
 * 
 * @author knav777
 */

class Server{

    constructor(){

        this.last_error = null;
    }

    start( express, morgan ){

        try {

            this.app = express();

            this.app.use( morgan( 'dev' ) );
            this.app.use( express.urlencoded( {extended: false} ) );
            this.app.use( express.json() );

            this.front_files_path = this.path;
            this.port = process.env.PORT || 3000;
            
            this.app.set( 'port', this.port );
            this.app.set( 'json spaces', 2 );
            this.app.use( express.static( this.front_files_path ) );

            this.app.use( '/api/cartons', require( '../api/routes/cartons' ) );
            
            return true;

        } catch ( error ) {

            this.last_error = "ERROR: " + error.message;
            return false;
        }
    }
    
    listen(){
        
        try {
        
            const server_setted = this.app.listen( this.port, () => {
                console.log( 'Listen, port: ', this.port );
            })

            return server_setted;
        
        } catch ( error ) {

            this.last_error = "ERROR: " + error.message;
            return null;
        }
    }
    
    setToolPath( path ){
        
        this.path = path;
    }

    getLastError(){

        return this.last_error;
    }
}

module.exports = new Server();