const router = require('express').Router()
const locationsService = require('./locations.service')

router.get("/",(req, res) => {
  res.send("Hello World !");
});

const {getLocations, getLocationbyID, updateLocation, deleteLocation} = require('./locations.service.js')

async function CreateLocation(req,res)
{
  const location = await locationsService.CreateLocation(
    req.body?.filmName,
    req.body?.filmType,
    req.body?.year,
    req.body?.filmProducerName,
    req.body?.endDate,
    req.body?.district,
    req.body?.geolocation,
    req.body?.sourceLocationId,
    req.body?.filmDirectorName,
    req.body?.address,
    req.body?.startDate
    )
  res.status(200).send(location)
}

router.get('/locations', getLocations)
router.get('/locations/:id',getLocationbyID)
router.post('/locations', CreateLocation)
router.put('/locations/:id',updateLocation)
router.delete('/locations/:id', deleteLocation)

module.exports = router
