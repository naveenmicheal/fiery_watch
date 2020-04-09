const mongoose = require('mongoose')

const coordsmodel = mongoose.Schema({
	name:{
		type:String,
		required:true,
		// unique: true
	},
	coords:{
		type:Array,
		required:true,
		// unique: true
	}

});

module.exports = mongoose.model('cntareas', coordsmodel);