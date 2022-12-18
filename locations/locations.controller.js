const router = require('express').Router()
const passport = require('passport')
const roleMiddleware = require('../rolemanagement/authorizationmiddleware')
require('dotenv').config()

router.get("/",(req, res) => {
  res.send("Hello World !");
});

const {CreateLocation,getLocations, getLocationbyID, UpdateLocationByID, deleteLocationByID} = require('./locations.service.js')

async function getOneLocationHandler(req,res)
{
  const locationID = req.params.id
  if (!locationID)
  {
    return res.status(400).send("Error, no location ID provided");
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

async function UpdateOneLocation(req,res)
{
  const locationID = req.params.id
  if (!locationID)
  {
    return res.status(400).send("Error, no location ID provided");
  }
  try 
  {
    const message = await UpdateLocationByID(locationID,req.body)
    return res.status(200).send(message)
  }
  catch
  {
    return res.status(400).send("Bad Request")
  }
}

async function DeleteOneLocation(req,res)
{
  const locationID = req.params.id
  if (!locationID)
  {
    return res.status(400).send("Error, no location ID provided");
  }
  try
  {
    const message = await deleteLocationByID(locationID)
    return res.status(200).send(message);
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

async function CreateOneLocation(req,res)
{
  try
  {
    return res.status(200).send(await CreateLocation(req.body))
  }
  catch
  {
    return(res.status(400).send("Bad Request"))
  }
}

router.get('/locations',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']), getLocations)
router.get('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['basic_user','admin']),getOneLocationHandler)
router.post('/locations', passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),CreateOneLocation)
router.put('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),UpdateOneLocation)
router.delete('/locations/:id',passport.authenticate('jwt',{session:false}),roleMiddleware.roleAccess(['admin']),DeleteOneLocation)

module.exports = router
