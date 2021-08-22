class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        let userid = 0;
        /* const data = req.body;
        const action = data.action; */
        const io = require( '../index' ).io;

        io.on( 'connection', ( socket ) => {
            userid = socket.id;
            console.log( 'socket connection opened ID:', socket.id );
            
            /* socket.on('chat:message', ( data ) =>{
                this.actionOne( data );
            });
          
            socket.on('chat:typing', function(data) {
              socket.broadcast.emit('chat:typing', data);
            }); */
        });

        const IDs = await io.allSockets();
        let count = io.engine.clientsCount;

        if( 1/* action === 'join' */ ){
            resp = {
                "action": "joined",
                "userid": count,
                "board": [ 
                    [ 3, 4, 5, 2, 1 ],
                    [ 3, 4, 5, 2, 1 ],
                    [ 3, 4, 5, 2, 1 ],
                    [ 3, 4, 5, 2, 1 ],
                    [ 3, 4, 5, 2, 1 ]
                ]
            };
            
            res.json( resp );
        }
        else{
            res.status(500).json({error: 'There was an error.'});
        }
    }



}

module.exports = new Api();