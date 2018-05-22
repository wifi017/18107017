var http = require( 'http' ); // Modul für HTTP-Requests
var fs = require( 'fs' ); // Zugriff auf Dateisystem

http.createServer( function( request, response ) {
  console.log( 'Anfrage wurde an den Server geschickt.' );
  console.log( request.url );
  //response.end( 'Hallo Welt' );
  if ( request.url == '/test.html' ) {
    fs.readFile( 'test.html', function(err,inhalt) {
      response.end( inhalt );
    } );
  } else {
    response.writeHead( 404 );
    response.end( 'Error...' );
  }


}).listen( 12345 );
console.log( 'Server ist gestartet' );
