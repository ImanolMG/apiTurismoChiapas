const lugaresDAO = require('../models/lugaresDAO')

const getAllLugares = (req, res)=> {
    lugaresDAO.getAllLugares(data => {
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

const agregar = (req, res) => {
    console.log('Agregar => in')

    if (req.user) {
        const lugar = {
            idLugares : req.body.idLugares,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            imagen : req.body.imagen
        }
        lugaresDAO.insertLugar(lugar, (data) => {
            res.send({
                status: true,
                message: 'Lugar agregado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al agregar lugar',
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



module.exports = {
agregar,
getAllLugares

}