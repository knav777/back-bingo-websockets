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

            this.app.use( ( req, res, next ) => {
                //allow access from every, elminate CORS
                res.setHeader('Access-Control-Allow-Origin','*');
                res.removeHeader('x-powered-by');
                //set the allowed HTTP methods to be requested
                res.setHeader('Access-Control-Allow-Methods','*');
                //headers clients can use in their requests
                res.setHeader('Access-Control-Allow-Headers','Content-Type');
                //allow request to continue and be handled by routes
                next();
            } );

            this.port = process.env.PORT || 3000;            
            this.app.set( 'port', this.port );
            this.app.use( '/api/bingo', require( '../api/routes/bingo' ) );
            
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

    getToolPath(){
        
        return this.path;
    }

    getLastError(){

        return this.last_error;
    }

    getAppServer(){

        return this.app;
    }
}

module.exports = new Server();