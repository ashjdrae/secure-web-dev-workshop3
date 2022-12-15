const router = require('express').Router()
const passport = require('passport')
const roleMiddleware = require('../rolemanagement/authorizationmiddleware')
require('dotenv').config()

router.get("/",(req, res) => {
  res.send("Hello World !");
});

const {DisplayCreatedLocation,getLocations, getLocationbyID, updateLocation, deleteLocation} = require('./locations.service.js')

router.get('/locations',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']), getLocations)
router.get('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']),getLocationbyID)
router.post('/locations', passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),DisplayCreatedLocation)
router.put('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),updateLocation)
router.delete('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),deleteLocation)

module.exports = router
