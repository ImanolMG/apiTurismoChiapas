const bd = require('../configMysql')

module.exports = {
    insertRestaurante : (restaurante, callback)=>{
        let sql = 'INSERT INTO restaurantes SET ?'
        bd.query(sql,restaurante,(err,data) => {
            if(err)
                return callback(null)
            else
                return callback (data)
        })
    },
    updateRestaurante : (restaurante, callback)=>{
        let sql = 'UPDATE restaurantes SET ? WHERE = idRestaurantes = ?'
        bd.query(sql,restaurante,(err,data) => {
            if(err)
                return callback(null)
            else
                return callback (data)
        })
    },
    getAllRestaurantes: (callback) =>{
        let sql = 'SELECT * FROM restaurantes'
        bd.query(sql, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    getRestaurante: (idRestaurantes, callback) =>{
        let sql = 'SELECT * FROM restaurante WHERE idRestaurantes = ?'
        bd.query(sql, idRestaurantes, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    deleteRestaurante: (idRestaurantes, callback) => {
        let sql = 'DELETE FROM restaurantes WHERE idRestaurantes = ?'
        bd.query(sql,idRestaurantes, (err, data) => {
            console.log("err =>",err)
            console.log("data =>",data)
            try {
                if (err) throw new Err('Error en la eliminación')
                return callback(data)
            }
            catch (Err) {
                return callback(null)
            }
        })
    }



};