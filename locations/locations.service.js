// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

const createLocation = (req, res)=>{
  Location.create({
      location: req.body.location,
      filmName : "Retour vers le Futur"
  }).then(location=>{
      res.status(200).json(location)
  })
  .catch(err=>{
      res.json(err)
  })
}

const getLocations = (req, res)=>{
  Location.find()
  .then(locations=>{
      res.json(locations)
  })
  .catch(err=>{
      res.json(err)
  })
}
const getLocationbyID = (req, res)=>{
  Location.find({_id :req.params.id})
  .then(locations=>{
      res.json(locations)
  })
  .catch(err=>{
      res.json(err)
  })
}
const updateLocations = (req, res)=>{
  Location.findOneAndUpdate({_id :req.params.id},
    {
      $set: {
      filmName : "Retour vers le Futur 2"
    },
  },
      {new:true},
      (err, Location) => {
        if (err) {
          res.send(err);
        } else res.json(Location);
      }
    );
}
const deleteLocation = (req, res)=>{
  Location.findByIdAndDelete(req.params.id)
  .then(location=>{
      res.json(location)
  })
  .catch(err=>{
      res.json(err)
  })
}
module.exports = { createLocation, getLocations, getLocationbyID, updateLocations, deleteLocation}
