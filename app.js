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

//Tell server to read JSON data
app.use(bodyParser.json());

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
var url = 'mongodb://localhost:27017/list';
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
	db.collection('items').find().toArray((err, result) => {
	if(err) {
		return console.log(err);
	}
	else {
		res.render('index.ejs', {items:result});
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
app.post('/items', (req, res) => {
	db.collection('items').save(req.body, (err, result) => {
		if(err) {
			return console.log(err);
		}
		else {
			console.log("Saved to database");
			res.redirect('/');
		}
	});
});

/************************************************************************
 *
 *
 * 	PUT REQUESTS
 *
 *
 ************************************************************************/
app.put('/items', (req, res) => {
	//Handle Put Request
	db.collection('items').findOneAndUpdate({firstName:'A'}, {
		$set: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		}
	}, {
		sort: {_id: -1},
		upsert: true
	}, (err, result) => {
		if(err) return res.send(err);
		console.log("List item updated!");
		res.send(result)
	})
});

/***************************************************************************
 *
 *
 * 	DELETE REQUESTS
 *
 *
 ***************************************************************************/
app.delete('/items', (req, res) => {
	db.collection('items').findOneAndDelete({firstName: req.body.firstName},
		(err, result) => {
			if(err) return res.send(500, err);
			console.log("List item deleted!");
			res.send(result);
		});
});
