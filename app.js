// Library imports
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = 3000
var path = require('path');

// Creating the express server
const app = express();

// Starting the express server
app.listen(PORT, function()
{
	console.log("Listening on " + PORT)
});

// Creating the MySQL connection
var db = mysql.createPool({
	connectionLimit: 10,
	host     : 'cop4710db.cl3pgb8hw8fv.us-east-1.rds.amazonaws.com',
  	user     : 'cop4710user',
  	password : 'cop4710pass',
  	database : 'akean_project'

});

// Body-parser initialization
app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: '7i5mnQZjPSqL924rQvxG',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: true,
		maxAge: 86400000
	}
}));

// Sets directory for files to serve (files not in this directory will not be served)
app.use(express.static(path.join(__dirname, 'HTML')));

// 6 pages total
// Pulling the login page
app.get('/home',function(req,res){
    res.sendFile(__dirname + '/html/dashboard.html');
});

//////////////////////////////////////////////////////////////////////


//Routes

// Search for events.
app.post('/searchEvents', function(req,res){

    // Create connection to database
	db.getConnection(function(err, tempCont){
			
		// Error if connection is not established
		if(err) {
			res.status(400).send('Connection fail');
				
		} else { 
			
			
			const sqlSearchEvent = 'SELECT * FROM ALL_EVENTS WHERE name = ? AND cat = ?';
			tempCont.query(sqlSearchEvent,[req.body.name, req.body.cat], function(err, result) {
					
				// Check if query works
				if (err) {
					res.status(400).send('Query Fail');
                } 
                else {
					res.status(200).send(result);		
				}
					
				// End connection
				tempCont.release();
			
			});
				
		}

	});
});


// Create Event.
app.post('/createEvent', function(req,res){

    // Create connection to database
	db.getConnection(function(err, tempCont){
			
		// Error if connection is not established
		if(err) {
			res.status(400).send('Connection fail');
				
		} else { 
			
			
			const sqlCreateEvent = 'INSERT INTO ALL_EVENTS (userID, cat, startTime, endTime, location, name, description) VALUES(';
			tempCont.query(sqlCreateEvent + req.body.userID + "," + req.body.cat + ", '" + req.body.startTime + "', '" + req.body.endTime + "'," + req.body.location + ", '" + req.body.name + "', '" + req.body.description + "')", function(err, result) {
					
				// Check if query works
				if (err) {
					res.status(400).send('Query Fail');
                } 
                else {
					res.status(200).send(result);		
				}
					
				// End connection
				tempCont.release();
			
			});
				
		}

	});
});


// Create RSO.
app.post('/createRSO', function(req,res){

    // Create connection to database
	db.getConnection(function(err, tempCont){
			
		// Error if connection is not established
		if(err) {
			res.status(400).send('Connection fail');
				
		} else { 
			
			
			const sqlCreateEvent = 'INSERT INTO RSO (universityID, userID, name) VALUES(';
			tempCont.query(sqlCreateEvent + req.body.universityID + "," + req.body.userID + ", '" + req.body.name + "')", function(err, result) {
					
				// Check if query works
				if (err) {
					res.status(400).send('Query Fail');
                } 
                else {
					res.status(200).send(result);		
				}
					
				// End connection
				tempCont.release();
			
			});
				
		}

	});
});

// Search for events.
app.post('/searchRSO', function(req,res){

    // Create connection to database
	db.getConnection(function(err, tempCont){
			
		// Error if connection is not established
		if(err) {
			res.status(400).send('Connection fail');
				
		} else { 
			
			
			const sqlSearchEvent = 'SELECT * FROM RSO WHERE name = ?';
			tempCont.query(sqlSearchEvent,[req.body.name], function(err, result) {
					
				// Check if query works
				if (err) {
					res.status(400).send('Query Fail');
                } 
                else {
					res.status(200).send(result);		
				}
					
				// End connection
				tempCont.release();
			
			});
				
		}

	});
});




app.post('/test', function(req, res){
    if(checkInput(req.body.email, "email") && checkInput(req.body.password, "password") && checkInput(req.body.answer, "answer")){
        
        // Create connection to database
		db.getConnection(function(err, tempCont){
			
			// Error if connection is not established
			if(err) {
				res.status(400).send('Connetion Fail');				
            } 
            
            else {
                // Add user to database
				const sqlAddUser = "INSERT INTO STD_USER (password, email, universityID, securityAns) VALUES ('";
				tempCont.query(sqlAddUser + req.body.password + "', '" + req.body.email + "', " + req.body.universityID + ", '" + req.body.securityAns + "')", function(err, result) {

                    // Check if query works
					if(err) {
						res.status(400).send('Query Fail');
                    }
                    else {
						res.status(200).send('Query Success');	
					}
							
					// End connection
					tempCont.release();

                });
							
	        }
        });
	}
	
	

    else{
        res.status(400).send('Invalid Values');
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.securityAns);

    }
});














//Check for valid inputs to stop SQL injections.
var checkInput = function(input, type, callback) {
	
	var returnVal = null;
	
	switch(type) {
		
		case "username":
			var re = /^[a-z|\d]{1,20}$/i; // Format 5-20 characters and digit
			returnVal = re.test(input);
			break;

		case "password":
			 var re= /[a-z\d]{32}$/;
			 returnVal= re.test(input);
			 break;
			
		case "email":
			var re = /^[a-z\d]{1,20}@[a-z]{1,10}(\.[a-z]{3}){1,2}$/i; // Format 1-20 character @ 1-10 characters . extension
			returnVal = re.test(input);
			break;

        // needs work
		case "answer":
			var re = /^[a-z|\d]{1,30}$/i;
			var ans = input.replace(/\s/g,'');
			ans.toLowerase();
			console.log("The answer is:" + ans); 
			returnVal = re.test(ans);
			break;
			
		case "name":
			var re = /^[a-z]{1,20}$/i; // Format 20 characters
			returnVal = re.test(input);
			break;
			
		case "phone":
			var re = /(1){0,1}\d{10}$/i; // Format 18004445555 | 4074445555
			var number = input.replace(/[^\d]/g, '');
			returnVal = re.test(number);
			break;

		case "phonesearch":
			var re = /\d{1,11}$/;
			returnVal = re.test(input);
			break;
		
		default:
			returnVal = null;
			break;
	}
	
	if(callback == undefined) {	
		return returnVal;
		
	} else {
		callback(returnVal);
	}
}































// Test route to test DB query.
app.get('/register', function(req,res){

    // Create connection to database
	db.getConnection(function(err, tempCont){
			
		// Error if connection is not established
		if(err) {
			res.status(400).send('Connection fail');
				
		} else { 
			
			// Delect contact from database, Might need a parseInt method if UserID and ContactId is parsed as a string
			const sql = 'SELECT * FROM STD_USER';
			tempCont.query(sql, function(err, result) {
					
				// Check if query works
				if (err) {
					res.status(400).send('Query Fail');
                } 
                else {
					res.status(200).send(result);		
				}
					
				// End connection
				tempCont.release();
			
			});
				
		}

	});
});

