var express = require('express');
var router = express.Router();
const usersService = require('../controllers/usersService')
const jwt = require('jsonwebtoken')
const configuration = require('../ConfigServer')

//Zona de Middleware
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




router.get('/usernameValidate/:username',usersService.usernameValidate);
router.get('/getUser/:idUser',usersService.getUser);
router.get('/getAllUsers',usersService.getAllUsers);
router.delete('/deleteUser/:idUser', usersService.deleteUser);
router.post('/signup', usersService.signup)
router.post('/agregar', usersService.agregar)
router.post('/login',usersService.login)
module.exports = router;
