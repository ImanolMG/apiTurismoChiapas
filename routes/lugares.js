const express = require('express');
const router = express.Router();
const lugaresService = require('../controllers/lugaresService')
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

router.post('/agregar', lugaresService.agregar)
router.get('/getAllLugares',lugaresService.getAllLugares);
router.delete('/deleteLugar/:idLugares', lugaresService.deleteLugar);
router.get('/getLugar/:idLugares', lugaresService.getLugar)
module.exports = router;
