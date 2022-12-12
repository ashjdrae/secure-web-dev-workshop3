const router = require('express').Router()
const JWTStrategy = require('../auth/jwt.strategy')
const localStrategy = require('../auth/local.strategy')
const userService = require('./user.service')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
const User = require('./user.model')

const {GetSelf, UpdateSelf, DeleteSelf,GetAll,authMiddleware,roleMiddleware} = require('./user.service.js')

async function Register(req,res){
    if(req.body?.username == null || req.body?.password == null)
    {
        res.json('Need a username and a password')
        return;
    }
    const user = await localStrategy.Register(req.body?.username,req.body?.password)
    res.status(200).send(user)    
}

async function Login(req,res) {
    var user = await localStrategy.GetUser(req.body?.username);
    if(user == null)
    {
        res.json('Error 404')
        return;
    }
    const verifpassword = await localStrategy.checkPassword(req.body?.username,req.body?.password);
    if (verifpassword == false)
    {  
        res.json('Error 403')
        return;
    }
    user = await localStrategy.GetUser(req.body?.username);
    var token = await JWTStrategy.CreateToken(user._id);
    res.json({
    token
    })
}

router.post('/users/register',Register);
router.post('/users/login',Login);
router.get('/users/me', GetSelf)
router.put('/users/me', UpdateSelf)
router.delete('/users/me', DeleteSelf)
router.get('/users', GetAll)

//Part with passports / Workshop5
router.get('/users/mee', authMiddleware, roleMiddleware(['admin']), (res,req) => {
	res.status(200).send(req.user)
})
router.get('/users/meee',authMiddleware)

// Login with passport
router.post('/users/login2',
    passport.authenticate('local',{session:false}),
    async(req,res)=>{
        res.status(200).json("Token: "+await JWTStrategy.CreateToken(req.user.id))
    }
)
// Authentification with passport jwt
router.get('/users/getallpassport', passport.authenticate('jwt',{session:false}),(req, res) => {
    User.find()
        .then(users=>{
        res.json(users)
        })
        .catch(err=>{
        res.json(err)
        })
})

module.exports = router