class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        
        if( req.method === 'POST' ){
            
            var userid = 0;
            const data = req.body;
            const action = data.action;
            var io = require( '../index' ).VARS.io;
    
            const IDs = await io.allSockets();
            let count = io.engine.clientsCount;
    
            if( action === 'join' ){
    
                let board = [];
    
                for( let i = 0; i < 5 ; i++ ){
                    board[i] = [];
    
                    for( let j = 0; j < 5; j++ ){

                        if( i === 2 && j === 2 ){
                            board[i][j] = 0;
                        }
                        else{
                            board[i][j] = Api.generateRandom( 1, 75 );
                        }
                    }
                }

                io.on( 'connection', ( socket ) => {
    
                    console.log( 'socket connection opened ID:', socket.id );
                    //userid = socket.id;
    
                    /* let data = {
                        "hola": "hola"
                    };
    
                    setInterval( () => {
                        socket.emit( 'game:join', data );
                    }, 1000 )
                     */
                    /* socket.on( 'game:join', function(data) {
    
                        data = {
                            "hola": "hey"
                        };
    
                        console.log( data )
                        
                    }); */
        
                    socket.on("disconnect", () => {
                        console.log("Client disconnected");
                    });
                });
    
                resp = {
                    "action": "joined",
                    "userid": userid,
                    "board": board,
                };
                
                res.json( resp );
            }
            else if( action === 'received' ){
    
    
            }
        }
        else{
            res.send( 'received' );
        }

    }

    static generateRandom( min, max ) {
        return Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
    }

}

module.exports = new Api();