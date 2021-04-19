const hospedajesDAO = require('../models/hospedajesDAO')


const getAllHospedajes = (req, res)=> {
    hospedajesDAO.getAllHospedajes(data => {
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

const getHospedaje = (req, res)=> {
    hospedajesDAO.getHospedaje(req.params.idHospedajes, (data) => {
        try{
            console.log('Data =>',data)
            if(!data) throw new Err("No hay lugar")
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
const agregar = (req, res) => {
    console.log('Agregar => in')

    if (req.user) {
        const hospedaje = {
            idHospedajes : req.body.idHospedajes,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            ubicacion: req.body.ubicacion,
            costo : req.body.costo,
            imagen : req.body.imagen,
            tipoHospedaje : req.body.tipoHospedaje
        }
        hospedajesDAO.insertHopedaje(hospedaje, (data) => {
            res.send({
                status: true,
                message: 'Hospedaje agregado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al agregar el hospedaje',
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
const editarHospedaje = (req, res) => {
    console.log('Editar => in')
    if (req.user) {
        const hospedaje = {
            idHospedajes : req.body.idHospedajes,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            ubicacion: req.body.ubicacion,
            costo : req.body.costo,
            imagen : req.body.imagen,
            tipoHospedaje : req.body.tipoHospedaje
        }
        hospedajesDAO.updateHospedaje(hospedaje, (data) => {
            res.send({
                status: true,
                message: 'Lugar editado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al editar el lugar',
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

const deleteHospedaje = (req, res) => {
    hospedajesDAO.deleteHospedaje(req.params.idHospedajes, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del hospedaje :(: ${req.params.idHospedajes}`)
            res.send({
                status: true,
                message: `Eliminación del hospedaje: ${req.params.idHospedajes} fue exitosa`
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
    getAllHospedajes,
    deleteHospedaje,
    editarHospedaje,
    getHospedaje
}


