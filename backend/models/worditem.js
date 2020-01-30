const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	value:String,
	rank:Number,
	date: { type: Date, default: Date.now },
})

module.exports = mongoose.model("WordItem",Schema);