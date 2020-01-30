const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const wordrouter = require("./routes/wordrouter");
const session = require("express-session");
const cors = require('cors');
//MongoDB session store for Connect and Express
const MongoStore = require("connect-mongo")(session);
const request = require("request");
var DomParser = require('dom-parser');
var stripJs = require('strip-js');

let app = express();

app.use(cors());

app.use(bodyParser.json());

//User databases

app.use(express.static(__dirname+"/static"));

function getJson(uri, req, res) {
	
	request(
		{ uri: uri },
		function(error, response, body) {

			if (!error && response.statusCode == 200) {
				//console.log(body);
			var safeHtml = stripJs(body);
			
			var fin = safeHtml.replace(/&#xE4;/g,'ä').replace(/&#xF6;/g,'ö');
			//console.log(fin);
			//console.log(safeHtml.replace("&#xE4;","ä").replace("&#xF6;","ö"));
			var parser = new DomParser();			
			var dom = parser.parseFromString(fin);
			var text = dom.getElementsByTagName('body')[0].textContent;
			//console.log(text);
			var wordList = text.replace(/[0-9]/g,'').replace(/[.,:;#$-/{}()! ]/g,' ').replace(/\s+/g,' ').split(" ");
			//console.log(wordList);
			var  count = {};
			var excludes = ['size','center','bottom','html','block','display','overflow','serif','bold','black','"Arial"','"Helvetica"','"HelsinginText"','"Georgia"','"SanomatSlab"','background','subscription','white','align','border','hidden','padding','padding','margin','grid','xAD','none','text','item','font','width','color',];
			wordList.forEach(function(i) { 
				if ((i.length > 2)&&(!excludes.includes(i))) {
					count[i] = (count[i]||0) + 1;
				}
				
			});
				var sortedList = {};
				Object.keys(count).sort((a,b) => count[a]-count[b]).forEach((key) => {
					sortedList[key] = count[key]; });
			//console.log(sortedList);
			res.send(sortedList);
			} else {
			console.log(error);
			}
			
		}
	);
  }

app.post("/card", (req, res) => {
	//console.log(req.body);
	
	getJson(req.body.url, req, res);
	//console.log(res);
});

/*mongoose.connect("mongodb://localhost/parser", { useNewUrlParser: true, useUnifiedTopology: true }).then(
	() => {console.log("Connection to mongoDB successful")},
	(error) => {console.log("Connection to mongoDB failed:"+error)}
);

app.use(session({
	name:"parser",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24},
	store: new MongoStore({
			collection:"session",
			url:"mongodb://localhost/parser",
			ttl:24*60*60
	})
}));

app.use("/api", wordrouter);*/

const port = process.env.PORT || 3001;

app.listen(port);
console.log("Running in port 3001");