const userDAO = require('../models/usersDAO')
const bcrypt = require('bcrypt')
const jwt = require('../utils/GenerateJWT')

const usernameValidate = (req, res) => {
    userDAO.findByUsername(req.params.username, (data) =>{

        try {
            if (!data) throw new Err("Usuario disponible")

            res.send({
                status: true,
                message: 'Usuario ocupado'
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Usuario disponible'
            })
        }
    })
}
const getAllUsers = (req, res)=> {
    userDAO.getAllUsers(data => {
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay usuario")
            res.send({
                status: true, data: data
            })
        }
        catch (Err){
            console.log('Data =>',data)
            res.send({
                status: false,
                message: 'Usuarios disponibles'
            })
        }
    })
}
const getUser  = (req, res)=> {
    userDAO.getUser(req.params.username, (data) =>{
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay usuario")
            res.send({
                status: true, data: data,


            })
        }
        catch (Err){
            console.log('Data =>',data)
            res.send({
                status: false,
                message: 'Usuarios disponible'

            })
        }
    })
}

const signup = (req, res) => {
    console.log('Signup => in')

    if (req.user) {
        const user = {
            idRol : req.body.idRol,
            nombre : req.body.nombre,
            apellidoPaterno : req.body.apellidoPaterno,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password,10)
        }
        userDAO.insertUser(user, (data) => {
            res.send({
                status: true,
                message: 'Usuario creado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al crear la cuenta de usuario',
                errorMessage: err
            })
        })
    }
    else {
        res.send({
            status:false,
            message: 'Este servicio requiere el uso de un Token válido, contactar al administrador',
            error: '100. Falta token'
        })
    }

}



const agregar = (req, res) => {
    console.log('Signup => in')

    if (req.user) {
        const user = {
            idUser : req.body.idUser,
            idRol : req.body.idRol,
            nombre : req.body.nombre,
            apellidoPaterno : req.body.apellidoPaterno,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password,10)
        }
        userDAO.insertNewUser(user, (data) => {
            res.send({
                status: true,
                message: 'Usuario creado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al crear la cuenta de usuario',
                errorMessage: err
            })
        })
    }
    else {
        res.send({
            status:false,
            message: 'Este servicio requiere el uso de un Token válido, contactar al administrador',
            error: '100. Falta token'
        })
    }

}
const login = (req,res) => {
    let username = req.body.username
    let password = req.body.password
    userDAO.findByUsername(username, (data) => {
        if (data) {
            console.log('Data =>',data)
            if (bcrypt.compareSync(password, data.password)){
                res.send({
                    status: true,
                    message: 'Contraseña correcta',
                    token: jwt.generateToken(data)
                })
            } else {
                res.send({
                    status: false,
                    message: 'Contraseña incorrecta'
                })
            }
        } else {
            res.send({
                status: false,
                message: 'La cuenta de usuario no existe'
            })
        }
    })
}

const deleteUser = (req, res) => {
    userDAO.deleteUser(req.params.idUser, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del usuario :(: ${req.params.idUser}`)
            res.send({
                status: true,
                message: `Eliminación del usuario: ${req.params.idUser} fue exitosa`
            })
        }
        catch (Err) {
            res.send({
                status: false,
                message: '<Personalizar el mensaje de error'
            })
        }
    })

}

const getIdRol  = (req, res)=> {
    userDAO.getIdRol(req.params.username, (data) =>{
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay idRol")
            res.send({
                status: true, data: data
            })
        }
        catch (Err){
            console.log('Data =>',data)
            res.send({
                status: false,
                message: 'IdRol disponible'

            })
        }
    })
}


module.exports = {
    usernameValidate,
    getUser,
    agregar,
    deleteUser,
    getIdRol,
    getAllUsers,
    signup,
login
}

