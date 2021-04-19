const bd = require('../configMysql')

module.exports = {
    insertHopedaje : (hospedaje, callback)=>{
        let sql = 'INSERT INTO hospedajes SET ?'
        bd.query(sql,hospedaje,(err,data) => {
            if(err)
                return callback(null)
            else
                return callback (data)
        })
    },
    updateHospedaje : (hospedaje, callback)=>{
        let sql = 'UPDATE hospedajes SET ? WHERE = idHospedajes = ?'
        bd.query(sql,hospedaje,(err,data) => {
            if(err)
                return callback(null)
            else
                return callback (data)
        })
    },
    getAllHospedajes: (callback) =>{
        let sql = 'SELECT * FROM hospedajes'
        bd.query(sql, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    getHospedaje: (idHospedajes, callback) =>{
        let sql = 'SELECT * FROM hospedajes WHERE idHospedajes = ?'
        bd.query(sql, idHospedajes, (err, data) => {
            if (err) throw err

            if (data.length>0)
                callback(data)
            else
                callback(null)
        })
    },
    deleteHospedaje: (idHospedajes, callback) => {
        let sql = 'DELETE FROM hospedajes WHERE idHospedajes = ?'
        bd.query(sql,idHospedajes, (err, data) => {
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