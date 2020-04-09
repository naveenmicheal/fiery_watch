const express = require('express')
const haversine = require('haversine')
const router = express.Router()
const dot_env = require('dotenv').config()
const mongoose = require('mongoose')
const dbmodel = require('../models.js')
// const dataset = require('../data_set')
const axios = require('axios');

console.clear()

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

const endpoint = "https://coronavirus-tracker-api.herokuapp.com/v2/locations/131?source=jhu&timelines=true"


router.get('/indiacount',(req,res)=>{
	axios.get(endpoint)
  .then(function (response) {
    let raw_data = response
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

router.get('/tncount',(req,res)=>{
	axios.get("https://raw.githubusercontent.com/naveenmicheal/__public_share/master/tndataset.json")
	.then(response =>{
		console.log(response.data)
		res.json(response.data)
	})
	.catch(err=>res.json(err))
})

router.get('/ctcords',(req,res)=>{
	
})

router.post('/ctcords',(req,res)=>{
	let iname = req.body.name
	let ilat = req.body.lat
	let ilng = req.body.lng
	
	newobj = {
		name:iname,
		coords:[{
			lat:ilat,
			lng:ilng
		}]
	}

	newobjmodel = new dbmodel(newobj)
	newobjmodel.save((err,result)=>{
		if(err){
			res.json(err)
		}
		else{
			res.json(result)
		}
	})
})


router.post('/check', (req, res)=>{
	let results = []
	let count = 0
	let nearings = []
  	let start ={
		latitude : parseFloat(process.env.i_lat),
		longitude : parseFloat(process.env.i_long)
	}
	
	// GET A DATASET FROM DB

	dbmodel.find({},(err,result)=>{
		if(err){
			res.json(err)
		}
		else{
			let dataset = result

			for (value of dataset){

				let end = value['coords'][0]

				let endpoint = {
					latitude : end['lat'],
					longitude : end['lng']
				}
				const lst = haversine(start,endpoint,{unit: 'meter'})
					if(lst < 25.000){
					console.log("Initiate alert system,")
					count +=1			
					nearings.push({name:value.name,distance:lst})
		}
		results.push({name:value.name,distance:lst})
	// console.log(`Distance from Mylocation to ${value.name} in ${haversine(start,end,{unit: 'meter'})}`)
	}
	if(count > 0){
		results.push({intensity:count,
			status:'Get the hell out of here'
		})
	}
	else{
		results.push({status:'None'})
	}

	results.push({stayaway:nearings})
	res.json(results)
		}	
	})
})



module.exports = router