const express = require('express')
const haversine = require('haversine')
const router = express.Router()
const dot_env = require('dotenv').config()
const dataset = require('../data_set')
const axios = require('axios');

const endpoint = "https://coronavirus-tracker-api.herokuapp.com/v2/locations/131?source=jhu&timelines=true"


router.get('/count',(req,res)=>{
	axios.get(endpoint)
  .then(function (response) {
    let raw_data = response
    debugger
    let count = {
    	confirmed : raw_data.data.location.latest.confirmed,
    	deaths: raw_data.data.location.latest.deaths,
    }
    res.json(count)
  })
  .catch(function (error) {
    res.json(error)
  })
})



router.post('/check', (req, res)=>{
	let results = []
	let count = 0
	let nearings = []
  var start ={
		latitude : parseFloat(process.env.i_lat),
		longitude : parseFloat(process.env.i_long)
	}
	for (value of dataset){
		var end ={
			latitude : parseFloat(value.lat),
			longitude : parseFloat(value.long)}
		const lst = haversine(start,end,{unit: 'meter'})
			if(lst < 25.000){
			console.log("Initiate alert system,")
			count +=1			
			nearings.push({name:value.name,distance:lst})
		}
		results.push({name:value.name,distance:lst})
	// console.log(`Distance from Mylocation to ${value.name} in ${haversine(start,end,{unit: 'meter'})}`)
}
	if(count > 0){
		results.push({intensity:count,status:'Get the hell out of here'})
	}
	else{
		results.push({status:'None'})
	}
	results.push({stayaway:nearings})
	res.send(results)

})

module.exports = router