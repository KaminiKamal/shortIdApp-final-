"use strict";
var mongoose = require('mongoose');
var SelectedModel = mongoose.Schema({
	model     :   {type : String, unique : false, required : true}
});


   module.exports = mongoose.model('selectedModel', SelectedModel);
