class Api{

    constructor(){}

    async requestPlay( req, res ){

        let resp = {};
        var bbdd = require( '../users.json' );
        let sockets_ids = [];
        var userid = 0;

        const io = require( '../index' ).VARS.io;

        io.on( 'connection', ( socket ) => {

            console.log( 'socket connection opened ID:', socket.id );
            const count = io.engine.clientsCount;

            console.log( count );

            if( ! sockets_ids.includes( socket.id ) ){
                sockets_ids.push( socket.id );

                if( count > 1 && bbdd.users.length > 1 ){
                    console.log( 'countdown' )
                    let countdown = 7;
                    io.sockets.emit( 'game:time', countdown );
    
                    setTimeout( () => {
                        let numbers_selected = [];
    
                        setInterval( () => {
    
                            do{
                                var is_num_exists = true;
                                var number = Api.generateRandom( 1, 75 );
                                
                                is_num_exists = numbers_selected.includes( number );                        
    
                            }while( is_num_exists );


                            if( numbers_selected.length >= 74 ){
                                io.sockets.emit( 'game:over', null );
                            }
                            else{
                                numbers_selected.push( number );
                                io.sockets.emit( 'bingo:callNumber', number );
                            }
                            

                        }, 500 );
    
                    }, (countdown * 1000) + 1000 );
                }
    
                socket.on( 'bingo:callBingo', ( data ) => {
    
                    const bundle = {...data, io}
                    Api.checkCartonWinner( bundle );
                })
    
                socket.on("disconnect", () => {
                    console.log("Client disconnected");
                });
            }

        });

        if( req.method === 'POST' ){

            const bundle = {
                "req": req,
                "res": res,
                "userid": sockets_ids.length
            };

            bbdd.users.push( bundle );
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
            board = Api.generateCartonUnique();

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

    static checkCartonWinner( bundle ){

        let userid = bundle.userid;
        let board = bundle.board;
        let io = bundle.io;
        let numbers_selected = bundle.boardSelected;

        let posi_selected = [];
        let cont = 0;

        numbers_selected.forEach( item => {

            for( let i = 0; i < board.length; i++ ){
                for( let j = 0; j < board[i].length; j++ ){
                    if( item === board[i][j] ){
                        posi_selected[cont] = [ i, j ];
                    }
                }
            }
            cont++;
        });

        io.sockets.emit( 'game:over', userid );
    }

    static generateCartonUnique(){
        
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

        return board;
    }

}

module.exports = new Api();