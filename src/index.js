//requires
const socket = require( 'socket.io' );
const express = require( 'express' );
const morgan = require( 'morgan' );
const path = require( 'path' );
const api = require( './api/api' );

const server = require( './bingo/server' );

let was_processed = false;
server.setToolPath( path.join( __dirname, '../' , 'public' ) );

was_processed = server.start( express, morgan );
if( ! was_processed ) console.error( server.getLastError() );

const server_setted = server.listen();
if( server_setted === null  ) console.error( server.getLastError() );

module.exports.io = socket( server_setted );