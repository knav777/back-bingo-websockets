//requires
const socket = require( 'socket.io' );
const express = require( 'express' );
const morgan = require( 'morgan' );
const path = require( 'path' );
const api = require( './api/api.js' );

const bingo_socket = require( './bingo/bingoSocket' );
const server = require( './bingo/server.js' );

let was_processed = false;

//server
server.setToolPath( path.join( __dirname, '../' , 'public' ) );

was_processed = server.start( express, morgan );
if( ! was_processed ) console.error( server.getLastError() );

const server_setted = server.listen();
if( server_setted === null  ) console.error( server.getLastError() );

//sockets
/* bingo_socket.setServer( server_setted );
bingo_socket.setSocket( socket );

was_processed = bingo_socket.start();
if( ! was_processed ) console.error( bingo_socket.getLastError() ); */

module.exports.io = socket( server_setted );