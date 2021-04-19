const express = require('express');
const router = express.Router();
const hospedajeService = require('../controllers/hospedajeService') //Cambiar

const jwt = require('jsonwebtoken')
const configuration = require('../ConfigServer')

router.use('/', (req, res, next) => {
    //Paso 1.
    const token =req.headers['authorization']
    if (!token){
        next()
        req.user = null
        return
    }
    jwt.verify(token,configuration.jwt.secret,(err, user)=>{
        if (err)
            req.user = null
        else
            req.user = user
        next()
    })
})


router.post('/agregar', hospedajeService.agregar)
router.put('/editar', hospedajeService.editarHospedaje)
router.get('/getAllHospedajes', hospedajeService.getAllHospedajes);
router.delete('/deleteHospedaje/:idHospedajes', hospedajeService.deleteHospedaje);
router.get('/getHospedaje/:idHospedajes', hospedajeService.getHospedaje)

module.exports = router;
