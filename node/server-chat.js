var express = require( 'express' );
var app = express();
var server = app.listen(26893, function() {
  console.log( 'WIFI Chat Server gestartet' );
});

var socket = require( 'socket.io' );

var io = socket( server );
var countUser = 0;
var countUserString = function() {
  return ' ('+countUser+' sind online)';
}

// Emoticons
//https://emojipedia.org/apple/

//https://unicode.org/emoji/charts/full-emoji-list.html
var makeCharEmojis = function(msg) {
    msg = msg.replace( /:\)/g,  '<img src="https://emojipedia-us.s3.amazonaws.com/thumbs/72/apple/118/grinning-face_1f600.png" style="height:1.5em;">' );
    msg = msg.replace( /haha/g, String.fromCodePoint(0x1F600) );
    msg = msg.replace( /:js/g, String.fromCodePoint(0x1F469, 0x200D, 0x1F4BB) );
    msg = msg.replace( /:rainbow/g, String.fromCodePoint(0x1F3F3, 0xFE0F, 0x200D, 0x1F308) );

    return msg;

}

io.on( 'connection', function( socketConn ) {

  console.log( 'Client Verbindung' );

  var user = '';

  socketConn.on( 'disconnect', function() {
    if ( user != '' ) {
      countUser--;
      console.log( 'Benutzer hat Chat verlassen.'  + countUserString() );
    }
  });

  socketConn.on( 'neueruser', function( username ) {
    countUser++;
    user = username;
    io.emit( 'serversagt', '<i>'+username+' ist online.</i>' );
    console.log( 'Neuer Benutzer "'+username+'" ist verbunden.' + countUserString() );
  });

  socketConn.on( 'nachricht', function( msg ) {
      msg = makeCharEmojis(msg);
      io.emit( 'serversagt', '<b>'+user+'</b>: '+msg );
  });



});
