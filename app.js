/*********************************************************************
 *
 *
 *	ADDING OUTSIDE MODULES
 *
 *
 *********************************************************************/

//Adding and instantiating express
const express = require('express');
const app = express();

//Adding body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//Adding MongoDB Connection
const MongoClient = require('mongodb').MongoClient;

//Set view engine as ejs
app.set('view engine', 'ejs');

//Make 'public' folder accessible
app.use(express.static('public'));

/**********************************************************************
 *
 *
 *	OTHER VARIABLES
 *
 *
 *********************************************************************/

//Port number the application will run on
const port_number = 3000;
//MongoDB Connection URL
var url = 'mongodb://localhost:27017/crud_application';
var db;

/**********************************************************************
 *
 *
 * 	CONNECT TO MONGO AND CREATE SERVER
 *
 *
 **********************************************************************/
MongoClient.connect(url, (err, database) => {
	if(err) {
		return console.log(err);
	}
	else {
		//assign db
		db = database;
		app.listen(port_number, () => {
		console.log("Listening on port number: " + port_number);
		});
	}
});

/**********************************************************************
 *
 *
 * 	GET REQUESTS
 *
 *
 **********************************************************************/
app.get('/', (req, res) => {
	db.collection('users').find().toArray((err, result) => {
	if(err) {
		return console.log(err);
	}
	else {
		res.render('index.ejs', {users:result});
		}
	});
});

/***********************************************************************
 *
 *
 * 	POST REQUESTS
 *
 *
 ************************************************************************/
app.post('/users', (req, res) => {
	db.collection('users').save(req.body, (err, result) => {
		if(err) {
			return console.log(err);
		}
		else {
			console.log("Saved to database");
			res.redirect('/');
		}
	});
});
