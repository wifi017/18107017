var express = require( 'express' ); // Server
var bp = require( 'body-parser' ); // Inhalte aus dem Request auslesen!!!
var fs = require( 'fs' );

var app = express();
var server = app.listen( 3008, function() {
  console.log( 'Server mit Express auf Port 3008 gestartet.');
});

// Zufgriff von anderen Quellen erlauben
/*
app.use( function( request, response, next ) {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS' );
  response.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );
  next(); // !!!! nicht vergessen
});
*/

//app.use( bp.urlencoded({extended:false})); // x-www-form-urlencoded
app.use( bp.json() ); // application/json

app.post( '/circle', function( request, response) {
  console.log( 'POST Request an Server' );
  console.log( request.body );
  var r = request.body.radius;
  var u = 2 * r * Math.PI;
  var f = r * r * Math.PI;
  response.setHeader( 'Content-Type','application/json' );
  response.end( JSON.stringify({umfang:u,flaeche:f}) );
});

app.get( '/', function( request, response ) {
  response.sendFile( __dirname + '/a26-api.html' );
});

app.get( '/j', function( request, response ) {
  response.sendFile( __dirname + '/jquery-3.3.1.min.js' );
})
