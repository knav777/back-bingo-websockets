class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        var userid = 0;

        const io = require( '../index' ).VARS.io;
        const IDs = await io.allSockets();
        const count = io.engine.clientsCount;

        io.on( 'connection', ( socket ) => {

            console.log( 'socket connection opened ID:', socket.id );
            userid = count;
            
            socket.on( 'game:join', function(data) {
                
                data = {
                    "hola": "hola"
                }
                console.log( data );
                socket.emit( 'game:joined', data );
            });

            let interval = null;

            if( interval ){
                clearInterval( interval );
            }

            interval = setInterval( () =>{
                let data = 'hoola';
                socket.emit('game:joined', data );
            }, 1000 )

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
        
        if( req.method === 'POST' ){
        
            const data = req.body;
            const action = data.action;
    
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