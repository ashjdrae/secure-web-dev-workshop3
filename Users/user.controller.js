const router = require('express').Router()
const userService = require('./user.service')

const {Register, Login, GetSelf, UpdateSelf, DeleteSelf,GetAll} = require('./user.service.js')

router.post('/register',async(req,res)=> {
    const user = await userService.Register(req.body?.username,req.body?.password)
    res.status(200).send(user)
})
router.post('/login', async(req,res)=> res.status(200).
send(await userService.checkPassword(req.body?.username,req.body?.password)))
//router.post('/users/register', Register)
//router.post('/users/login',Login)
router.get('/users/me', GetSelf)
router.put('/users/me', UpdateSelf)
router.delete('/users/me', DeleteSelf)
router.get('/users', GetAll)

module.exports = router