const rolesDAO = require('../models/rolesDAO')

const getAllRoles = (req,res) => {
    rolesDAO.getAllRoles((data) =>{
        try {
            if (!data) throw new Err("Catálogo vacío")

            res.send({
                status: true,
                data: data
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Catálogo vacío'
            })
        }
    })
};

const deleteRol = (req, res) => {
    rolesDAO.deleteRol(req.params.idRol, data => {
        try {
            if (!data) throw new Err("Hubo un error en el proceso")
            if (data.affectedRows === 0) throw new Err(`Falló la eliminación del idRol: ${req.params.idRol}`)
            res.send({
                status: true,
                message: `Eliminación de idRol: ${req.params.idRol} fue exitosa`
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
    getAllRoles,
    deleteRol,
}

