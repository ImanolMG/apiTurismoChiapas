const mysql = require('mysql');


const config = {
    host : 'localhost',
    user : 'user201269',
    database: 'bd_pw',
    password: 'Hacker2020',
};

const conn = mysql.createConnection(config);


conn.connect(function(err) {
    if (err) throw err;
    console.log('La conexion de la base de datos a sido exitosa!!');
});
module.exports = conn;