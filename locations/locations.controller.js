const router = require('express').Router()
const locationsService = require('./locations.service')

router.get("/",(req, res) => {
  res.send("Hello World !");
});

const {getLocations, getLocationbyID, createLocation, updateLocations, deleteLocation} = require('./locations.service.js')

router.get('/locations', getLocations)
router.get('/locations/:id',getLocationbyID)
router.post('/locations', createLocation)
router.put('/locations/:id', updateLocations)
router.delete('/locations/:id', deleteLocation)
module.exports = router
