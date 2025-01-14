const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

connection.connect((error)=>{
if(!error){
    console.log("Conectado");
}else{
    console.log(error);
}
});

module.exports = connection;