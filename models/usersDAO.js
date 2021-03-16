const bd = require('../configMysql')

module.exports = {
    findByUsername : (username, callback) => {
        let sql = 'SELECT * FROM user WHERE username=?'
        bd.query(sql,username, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data[0])
            else
                callback(null)
        })
    },
    getAllUsers : (callback) =>{
        let sql = 'SELECT * FROM user'
        bd.query(sql, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data[0])
            else
                callback(null)
        })
    },

getUser : (idUser, callback)=>{
  let sql = 'SELECT nombre, apellidoPaterno, username FROM user WHERE idUser=?'
    bd.query(sql, idUser, (err, data) => {

        if (err) throw err

        if (data.length>0)
            callback(data[0])
        else
            callback(null)
    })
},

    insertUser : (user, callback)=>{
        let sql = 'INSERT INTO user SET ?'
        bd.query(sql,user,(err,data) => {
            if(err)
                return callback(null)
            else
                return callback (data)
        })
    }

}