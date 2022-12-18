// This file holds the Business-Logic layer, interacting with Data Layer
const Location = require('./locations.model')
require('dotenv').config()

async function CreateLocation(locationbody)
{
  try {
    const location = new Location(locationbody)
    return await location.save()
  }
  catch {
    return "Bad Request"
  }
}

async function UpdateLocationByID (locationID,change)
{ 
  const location = await Location.findById(locationID)
  if (!location)
  {
    throw new Error ('NotFound')
  }
  await Location.findByIdAndUpdate(locationID,change)
  return "Update Done"
}
async function getLocations(req,res)
{
  Location.find()
  .then(locations=>{
      res.json(locations)
  })
}
async function getLocationbyID(locationID)
{
  const location = await Location.findById(locationID)
  if (!location)
  {
    throw new Error ('NotFound')
  }
  return location;
}

async function deleteLocationByID(locationID)
{
  const location = await Location.findByIdAndDelete(locationID)
  if (!location)
  {
    throw new Error ('NotFound')
  }
  return "Delete Done";
}
module.exports = {CreateLocation, getLocations, getLocationbyID,UpdateLocationByID, deleteLocationByID}
