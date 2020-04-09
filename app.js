const express = require('express');
const mongoose = require('mongoose');
const haversine = require('haversine')
const status = require('./routes/status')

const app = express();
app.use(express.json()); 
const port = 5000;

mongoose.connect(process.env.DBURI, 
	{dbName:'fieryWatch',useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', ()=>console.log("DB Connection Error"));
db.once('open',()=>console.log('Connction DB Done'));




app.use('/status', status)

app.get('/', (req, res)=>{
	res.json({
		"Name":"Fiery watch",
		"status":"Active"
	})
});




app.listen(port,()=>{
	console.log(`App listening on ${port}`)
})