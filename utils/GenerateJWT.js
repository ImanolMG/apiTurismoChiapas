const jwt = require('jsonwebtoken')
const configurationServer = require('../ConfigServer')

const generateToken = (user) => {
    let userToken = {
        idUser: user.idUSer,
        idRol: user.idRol,
        name: user.nombre
    }

    return jwt.sign(userToken,configurationServer.jwt.secret,{ expiresIn: 60 * 60 * 60})
}



module.exports = {
    generateToken
}