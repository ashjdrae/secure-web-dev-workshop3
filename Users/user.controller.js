const router = require('express').Router()
const userService = require('./user.service')

const {Register, Login, GetSelf, UpdateSelf, DeleteSelf,GetAll} = require('./user.service.js')

router.post('/users/register', Register)
router.post('/users/login',Login)
router.get('/users/me', GetSelf)
router.put('/users/me', UpdateSelf)
router.delete('/users/me', DeleteSelf)
router.get('/users', GetAll)

module.exports = router