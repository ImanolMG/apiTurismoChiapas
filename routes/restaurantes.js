const express = require('express');
const router = express.Router();
const restaurantesService = require('../controllers/restaurantesService') //Cambiar

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


router.post('/agregar', restaurantesService.agregar)
router.put('/editar', restaurantesService.editarRestaurante)
router.get('/getAllRestaurantes', restaurantesService.getAllRestaurantes);
router.delete('/deleteRestaurante/:idRestaurantes', restaurantesService.deleteRestaurante);
router.get('/getRestaurante/:idRestaurantes', restaurantesService.getRestaurante)

module.exports = router;
