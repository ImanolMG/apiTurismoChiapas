const mysql = require('mysql');


const config = {
    host : '54.89.203.179',
    user : 'ubuntu',
    database: 'bd_pw',
    password: 'password',
};

const conn = mysql.createConnection(config);


conn.connect(function(err) {
    if (err) throw err;
    console.log('La conexion de la base de datos a sido exitosa!!');
});
module.exports = conn;