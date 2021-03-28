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
        let sql = 'SELECT * FROM lugares'
        bd.query(sql, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },

};