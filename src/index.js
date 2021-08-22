//requires
const server = require( './bingo/server' );
const socketIo = require( 'socket.io' );
const express = require( 'express' );
const morgan = require( 'morgan' );
const path = require( 'path' );
const http = require( 'http' );

let was_processed = false;

was_processed = server.start( express, morgan );
if( ! was_processed ) console.error( server.getLastError() );

const app = server.getAppServer();

const server_created = http.createServer( app );
const io = socketIo( server_created );

module.exports.VARS = {
    "io": io,
    "front_files_path": server.getToolPath(),
    "app_server": server.getAppServer()
};

server_created.listen( 3000, () => { console.log( 'listen on: 3000' ) } );