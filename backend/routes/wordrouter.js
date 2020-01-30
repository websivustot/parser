const express = require("express");
const wordItem = require("../models/worditem");

let router = express.Router();


router.get("/word", function(req,res) {
	wordItem.find(function(err, items) {
		if(err){
			return res.status(404).json({"message":"wordlist not found"})
		}
		if(!items) {
			return res.status(404).json({"message":"wordlist not found"})
		}
		return res.status(200).json(items);
	})
})

router.post("/word", function(req,res) {
	let item = new wordItem({		
		title:req.body.title,
		description:req.body.description,
		type:req.body.type,
		industry:req.body.industry,
		user:req.body.user,
	})
	item.save(function(err) {
		if(err) {
			return res.status(409).json({"message":"item not saved"})
		}
		return res.status(200).json({"message":"success"});
	})

});

router.delete("/word/:id", function(req,res) {
	wordItem.deleteOne({"_id":req.params.id}, function(err) {
		if(err) {
			return res.status(404).json({"message":"not found"});			
		}
		return res.status(200).json({"message":"success"})
	})
});

module.exports = router;