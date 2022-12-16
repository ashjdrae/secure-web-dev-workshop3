const router = require('express').Router()
const passport = require('passport')
const roleMiddleware = require('../rolemanagement/authorizationmiddleware')
require('dotenv').config()

router.get("/",(req, res) => {
  res.send("Hello World !");
});

const {DisplayCreatedLocation,getLocations, getLocationbyID, updateLocation, deleteLocation} = require('./locations.service.js')

async function getOneLocationHandler(req,res)
{
  const locationID = req.params.id
  if (!locationID)
  {
    return sessionStorage.status(400).send("Error, no location ID provided");
  }
  try
  {
    const location = await getLocationbyID(locationID);
    return res.status(200).json(location);
  }
  catch
  {
    if (error.message == 'NotFound') 
    {
      return res.status(404).send('Location not found');
    }
    return res.status(500).send(error.message);
  }
}

router.get('/locations',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']), getLocations)
router.get('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']),getOneLocationHandler)
router.post('/locations', passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),DisplayCreatedLocation)
router.put('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),updateLocation)
router.delete('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),deleteLocation)

module.exports = router
