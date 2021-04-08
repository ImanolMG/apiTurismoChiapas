const bd = require('../configMysql')

module.exports = {
    insertLugar : (lugar, callback)=>{
        let sql = 'INSERT INTO lugares SET ?'
        bd.query(sql,lugar,(err,data) => {
            if(err)
                return callback(null)
            else
                return callback (data)
        })
    },
    getAllLugares: (callback) =>{
        let sql = 'SELECT * FROM lugares ORDER BY rand() LIMIT 6'
        bd.query(sql, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    getLugar: (idLugares, callback) =>{
        let sql = 'SELECT * FROM lugares WHERE idLugares = ?'
        bd.query(sql, idLugares, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    deleteLugar: (idLugares, callback) => {
        let sql = 'DELETE FROM lugares WHERE idLugares = ?'
        bd.query(sql,idLugares, (err, data) => {
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