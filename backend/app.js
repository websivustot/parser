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
var iconv  = require('iconv-lite');
// Imports the Google Cloud client library
//const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
//const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
/* const text = 'The text to translate, e.g. Hello, world!';
 const target = 'The target language, e.g. ru';

async function translateText() {
	// Translates the text into the target language. "text" can be a string for
	// translating a single piece of text, or an array of strings for translating
	// multiple texts.
	let [translations] = await translate.translate(text, target);
	translations = Array.isArray(translations) ? translations : [translations];
	console.log('Translations:');
	translations.forEach((translation, i) => {
	  console.log(`${text[i]} => (${target}) ${translation}`);
	});
  }
  
  translateText();*/

let app = express();

app.use(cors());

app.use(bodyParser.json());

//User databases

app.use(express.static(__dirname+"/static"));

function getJson(uri, req, res) {	

	var requestOptions  = { encoding: null, method: "GET", uri: uri, timeout: 2000};

	request( requestOptions,
		
		function(error, response, body) {

			if (!error && response.statusCode == 200) {
				var utf8String = iconv.decode(new Buffer.from(body), "ISO-8859-1");
				//console.log(utf8String);
			
				
			var safeHtml = stripJs(utf8String);
			//console.log(safeHtml);
			var fin = safeHtml.replace(/&#xC3;&#xA4;/g,'ä').replace(/&#xC3;&#xB6;/g,'ö').replace(/&#xE4;/g,'ä').replace(/&#xF6;/g,'ö').replace(/&#xC4;/g,'Ä').replace(/&#xD6;/g,'Ö');
			//console.log(fin);
			//console.log(safeHtml.replace("&#xE4;","ä").replace("&#xF6;","ö"));
			var parser = new DomParser();			
			var dom = parser.parseFromString(fin);
			var links = dom.getElementsByTagName("a");
			var text = dom.getElementsByTagName('body')[0].textContent;
			var a = [];	
			links.forEach(item => {
				var attrs = item.attributes;									
				attrs.forEach(attr => {					
					if (attr.name === 'href') {	
						if (!a.includes(attr.value)) {
							a.push(attr.value);	
						}					
												
					}					
				});				
			})
			//console.log(links[0].attributes);
			//console.log("linkcontent", links[0].attributes);
			console.log(a);
			var wordList = text.replace(/[0-9]/g,'').replace(/[.,:;#$-/{}()!?=" ]/g,' ').replace(/\s+/g,' ').split(" ");
			//console.log(wordList);
			var  count = {};
			var excludes = ['size','center','bottom','html','block','display','overflow','serif','bold','black','"Arial"','"Helvetica"','"HelsinginText"','"Georgia"','"SanomatSlab"','background','subscription','white','align','border','hidden','padding','padding','margin','grid','xAD','none','text','item','font','width','color',];
			wordList.forEach(function(i) { 
				if ((i.length > 2)&&(!excludes.includes(i))) {					
					count[i.toLowerCase()] = (count[i.toLowerCase()]||0) + 1;
				}				
			});
				var sortedList = {};
				Object.keys(count).sort((a,b) => count[a]-count[b]).forEach((key) => {
					sortedList[key] = count[key]; });
			//console.log(sortedList);
			var index = { list: sortedList, links: a}
			res.send(index);
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