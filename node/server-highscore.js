// https://github.com/jakesgordon/javascript-tetris

var express = require( 'express' ); // Server
var bp = require( 'body-parser' ); // Inhalte aus dem Request auslesen!!!
var fs = require( 'fs' );

var app = express();
var server = app.listen( 3223, function() {
  console.log( 'Server Highscore Port 3223 gestartet.');
});

// Zufgriff von anderen Quellen erlauben
app.use( function( request, response, next ) {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS' );
  response.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );
  next(); // !!!! nicht vergessen
});

app.use( bp.urlencoded({extended:false}));

var schreibeInsFile = function() {}
