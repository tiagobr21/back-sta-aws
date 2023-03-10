
const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
   port: process.env.DB_PORT,
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});



function handleDisconnect() {
  let connection = mysql.createConnection(connection); // Recreate the connection, since
                                                   // the old one cannot be reused.
 
   connection.connect(function(err) {              // The server is either down
     if(err) {                                     // or restarting (takes a while sometimes).
       console.log('error when connecting to db:', err);
       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
     }else{
       console.log("Connected");
     }                                     // to avoid a hot loop, and to allow our node script to
   });                                     // process asynchronous requests in the meantime.
                                           // If you're also serving http, display a 503 error.
   connection.on('error', function(err) {
     console.log('db error', err);
     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
       handleDisconnect();                         // lost due to either server restart, or a
     } else {                                      // connnection idle timeout (the wait_timeout
       throw err;                                  // server variable configures this)
     }
   });
 }



module.exports = connection;