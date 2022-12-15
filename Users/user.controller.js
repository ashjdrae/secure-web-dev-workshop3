const router = require('express').Router()
const JWTStrategy = require('../auth/jwt.strategy')
const localStrategy = require('../auth/local.strategy')
const passport = require('passport')
const roleMiddleware = require('../rolemanagement/authorizationmiddleware')
require('dotenv').config()

const {GetSelf, UpdateSelf, DeleteSelf,GetAllUsers,UpdateUserRole} = require('./user.service.js')

async function Register(req,res){
    if(req.body?.username == null || req.body?.password == null)
    {
        res.json('Need a username and a password')
        return;
    }
    const user = await localStrategy.Register(req.body?.username,req.body?.password)
    res.status(200).send(user)    
}

function CheckUserExists()
{
    return async function(req,res,next){
        if (await localStrategy.GetUser(req.body?.username)==null)
        {
            return res.status(404).send("User not found")
        }
        return next()
    };
}

router.post('/users/register',Register);

router.post('/users/login',CheckUserExists(),passport.authenticate('local',{session:false}),
async(request,response)=>{
const user = await localStrategy.GetUser(request.body?.username);
response.status(200).json("Token: "+await JWTStrategy.CreateToken(user._id))
});

router.get('/users/me',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']), GetSelf)
router.put('/users/me', passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']),UpdateSelf)
router.put('/users/:id', passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),UpdateUserRole)
router.delete('/users/me',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']), DeleteSelf)
router.get('/users',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),GetAllUsers)

module.exports = router