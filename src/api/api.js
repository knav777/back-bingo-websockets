class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        var userid = 0;

        const io = require( '../index' ).VARS.io;

        io.on( 'connection', ( socket ) => {

            console.log( 'socket connection opened ID:', socket.id );
            const count = io.engine.clientsCount;

            console.log( count );

            /* if( count > 0 ){ */
                console.log( 'countdown' )
                let countdown = 5;
                socket.emit( 'game:time', countdown );

                setTimeout( () => {
                    let numbers_selected = [];

                    setInterval( () => {

                        do{
                            var number = Api.generateRandom( 1, 75 );
                            var is_num_exists = numbers_selected.includes( number );                        

                        }while( is_num_exists );

                        numbers_selected.push( number );
                        socket.emit( 'bingo:callNumber', number );
                    }, 3000 );

                }, (countdown * 1000) + 1000 );
            //}

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });

        if( req.method === 'POST' ){

            const bundle = {
                "req": req,
                "res": res,
                "userid": 0
            };
            Api.actions( bundle );
        }

    }

    static generateRandom( min, max ) {

        let num = Math.floor( ( Math.random() * ( max - min + 1 ) ) + min );
        return parseInt( num, 10 );
    }

    static actions( bundle ){

        const req = bundle.req;
        const res = bundle.res;
        const userid = bundle.userid;

        const data = req.body;
        const action = data.action;

        if( action === 'join' ){

            let board = [];

            for( let i = 0; i < 5 ; i++ ){
                board[i] = [];

                for( let j = 0; j < 5; j++ ){

                    do{
                        var rule = false;
                        var is_num_exists = true;

                        var num = Api.generateRandom( 1, 75 );
                        is_num_exists = Api.existsThisNumberHere( num, board );
                        
                        if( j === 0 ) { rule = ( num >= 1 && num <= 15 ); }
                        else if( j === 1 ) { rule = ( num >=16 && num <= 30 ); }
                        else if( j === 2 ) { rule = ( num >=31 && num <= 45 ); }
                        else if( j === 3 ) { rule = ( num >=46 && num <= 60 ); }
                        else if( j === 4 ) { rule = ( num >=61 && num <= 75 ); }

                    } while( ! rule || is_num_exists );

                    if( i === 2 && j === 2 ){
                        board[i][j] = 0;
                    }
                    else{
                        board[i][j] = num;
                    }
                }
            }

            const resp = {
                "action": "joined",
                "userid": userid,
                "board": board
            };
            
            res.json( resp );
        }
    }

    static existsThisNumberHere( value, array ){

        for( let i = 0; i < array.length; i++ ){
            for( let j = 0; j < array[i].length; j++ ){
                if( value == array[i][j] ){
                    return true;
                }
            }
        }

        return false;
    }

}

module.exports = new Api();