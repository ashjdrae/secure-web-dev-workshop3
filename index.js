require('dotenv').config()
const mongoose = require('mongoose')

async function Connect()
{
	try {
		await mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected !')})
	}
	catch(error)
	{
		console.log(error)
	}
}

const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./Users/user.controller')
const app = express()
const port = 3000
/*
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
passport.user(new LocalStrategy)
*/
// Connection
Connect();
app.use(express.json())
app.use(express.urlencoded({extend:false}))
app.use(locationController)
app.use(userController)


app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})
