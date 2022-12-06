// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function CreateLocation(filmname=null,filmtype=null,years=null,producer = null,end = null, distr = null, geoloc = null,sourceloc = null,filmdir = null,addr=null,start=null) // values not given are null
{
    const location = new Location({
      filmName :filmname,
      filmType:filmtype,
      year:years,
      filmProducerName:producer,
      endDate:end,
      district:distr,
      geolocation : geoloc,
      sourceLocationID : sourceloc,
      filmDirectorName : filmdir,
      address : addr,
      startDate : start})
    return await location.save()
}
const updateLocation = (req, res)=>{ 
  const filmname = req.body?.filmName;
  const filmtype = req.body?.filmType;
  const years = req.body?.year;
  const producer = req.body?.filmProducerName;
  const end = req.body?.endDate;
  const distr = req.body?.district;
  const geoloc = req.body?.geolocation;
  const sourceloc = req.body?.sourceLocationID;
  const filmdir = req.body?.filmDirectorName;
  const addr = req.body?.address;
  const start = req.body?.startDate;
  Location.findOneAndUpdate({_id :req.params.id},
    {
      $set: {
      filmName : filmname,
      filmType : filmtype,
      year : years,
      filmProducerName : producer,
      endDate : end,
      district : distr,
      geolocation : geoloc,
      sourceLocationID : sourceloc,
      filmDirectorName : filmdir,
      address : addr,
      startDate : start
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
const deleteLocation = (req, res)=>{
  Location.findByIdAndDelete(req.params.id)
  .then(location=>{
      res.json(location)
  })
  .catch(err=>{
      res.json(err)
  })
}
module.exports = { CreateLocation, getLocations, getLocationbyID,updateLocation, deleteLocation}
