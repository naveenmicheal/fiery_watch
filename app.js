const express = require('express');
// const mongoose = require('mongoose');
const haversine = require('haversine')
const status = require('./routes/status')

const app = express();
app.use(express.json()); 
const port = 5000;

app.use('/status', status)

app.get('/', (req, res)=>{
	res.json({
		"Name":"Fiery watch",
		"status":"Active"
	})
});

// console.clear()

app.listen(port,()=>{
	console.log(`App listening on ${port}`)
})