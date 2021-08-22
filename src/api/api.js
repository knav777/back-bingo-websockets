class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        let userid = 0;
        const data = req.body || {};
        const action = data.action || '';
        const io = require( '../index' ).VARS.io;

        const IDs = await io.allSockets();
        let count = io.engine.clientsCount;

        if( action === 'join' ){

            let board = [];

            for( let i = 0; i < 5 ; i++ ){
                board[i] = [];

                for( let j = 0; j < 5; j++ ){
                    board[i][j] = Api.generateRandom( 1, 75 );
                }
            }

            io.on( 'connection', ( socket ) => {

                userid = socket.id;
                console.log( 'socket connection opened ID:', socket.id );
    
                socket.on("disconnect", () => {
                    
                });
            });

            const fetch = require('node-fetch');

            const front = await fetch( 'http://' + req.headers.host )
                            .then( resultadoRaw => {
                                
                                return resultadoRaw.text();
                            })
                            
                            .then( resultadoComoTexto => {
                                return resultadoComoTexto;
                            });

            resp = {
                "action": "joined",
                "userid": count,
                "board": board,
                "connection": front
            };
            
            res.json( resp );
        }
        else if( action === 'received' ){


        }
    }

    static generateRandom( min, max ) {
        return Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
    }

}

module.exports = new Api();