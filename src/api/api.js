class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        let userid = 0;
        const data = req.body;
        const action = data.action;
        const io = require( '../index' ).io;

        io.on( 'connection', ( socket ) => {
            userid = socket.id;
            console.log( 'socket connection opened ID:', socket.id );
        });

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

            resp = {
                "action": "joined",
                "userid": count,
                "board": board
            };
            
            res.json( resp );
        }
    }

    static generateRandom( min, max ) {
        return Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
    }

}

module.exports = new Api();