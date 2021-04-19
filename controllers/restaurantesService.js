const restaurantesDAO = require('../models/restaurantesDAO')

const getAllRestaurantes = (req, res)=> {
    restaurantesDAO.getAllRestaurantes(data => {
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

const getRestaurante = (req, res)=> {
    restaurantesDAO.getRestaurante(req.params.idRestaurantes, (data) => {
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay restaurante")
            res.send({
                status: true, data: data
            })
        }
        catch (Err){
            console.log('Data =>',data)
            res.send({
                status: false,
                message: 'restaurantes disponibles'
            })
        }
    })
}
const agregar = (req, res) => {
    console.log('Agregar => in')

    if (req.user) {
        const restaurante = {
            idRestaurantes : req.body.idRestaurantes,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            ubicacion: req.body.ubicacion,
            imagen : req.body.imagen,
            horarios : req.body.horarios
        }
        restaurantesDAO.insertRestaurante(restaurante, (data) => {
            res.send({
                status: true,
                message: 'Hospedaje agregado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al agregar el restaurante',
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
const editarRestaurante = (req, res) => {
    console.log('Editar => in')
    if (req.user) {
        const hospedaje = {
            idRestaurantes : req.body.idRestaurantes,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            ubicacion: req.body.ubicacion,
            imagen : req.body.imagen,
            horarios : req.body.horarios
        }
        restaurantesDAO.updateRestaurante(restaurante, (data) => {
            res.send({
                status: true,
                message: 'restaurante editado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al editar el restaurante',
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

const deleteRestaurante = (req, res) => {
    restaurantesDAO.deleteRestaurante(req.params.idRestaurantes, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del restaurante :(: ${req.params.idRestaurantes}`)
            res.send({
                status: true,
                message: `Eliminación del restaurante: ${req.params.idRestaurantes} fue exitosa`
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


module.exports = {
    agregar,
    getAllRestaurantes,
    deleteRestaurante,
    editarRestaurante,
    getRestaurante
}
