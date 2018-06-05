// https://github.com/jakesgordon/javascript-tetris

var express = require( 'express' ); // Server
var bp = require( 'body-parser' ); // Inhalte aus dem Request auslesen!!!
var fs = require( 'fs' );

var app = express();
var server = app.listen( 3223, function() {
  console.log( 'Server Highscore Port 3223 gestartet.');
});

var highscore;
fs.readFile( 'highscore.json', function( err, data ) {
  highscore = JSON.parse( data );
} );


var saveHighscoreToFile = function() {

  highscore.eintraege.sort( function(a,b) {
    return ( a.punkte * 1 > b.punkte * 1 )  ? -1: 1;
  })

  fs.writeFile( 'highscore.json', JSON.stringify( highscore ), function() {
    //könnte man noch was machen...
  });
}

// Zufgriff von anderen Quellen erlauben
app.use( function( request, response, next ) {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, DELETE' );
  response.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );
  next(); // !!!! nicht vergessen
});

app.use( bp.urlencoded({extended:false}));

app.get( '/highscore', function(req,res) {
  var serverAntwort = {
    success:true,
    eintraege:highscore.eintraege
  }
  res.end( JSON.stringify( serverAntwort ) );
});
app.post( '/highscore', function(req,res) {
  var neuerEintrag = {
    name: req.body.name,
    punkte: req.body.punkte * 1
  };
  //var neuerEintrag = req.body;
  highscore.eintraege.push( neuerEintrag );
  saveHighscoreToFile();
  res.end( JSON.stringify( {success:true} ) );
});
app.delete( '/highscore', function(req,res) {
  highscore.eintraege = [];
  saveHighscoreToFile();
  res.end( JSON.stringify( {success:true} ) );
});
