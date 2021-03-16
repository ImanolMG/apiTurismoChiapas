const bd = require('../configMysql')

module.exports = {
    getAllRoles: (callback) => {
        let sql = 'SELECT * FROM roles'
        bd.query(sql,(err, data) => {
            if (err) throw err

            if (data.length > 0)
                callback(data)
            else
                callback(null)
        })
    },
    deleteRol: (idRol, callback) => {
        let sql = 'DELETE FROM roles WHERE idRol = ?'
        bd.query(sql,idRol, (err, data) => {
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