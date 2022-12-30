// setup express environment
const express = require("express");
const app = express();

// dependencies and middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cross origin
const cors = require('cors');
app.use(cors());

// axios for http requests
const axios = require('axios');

// dotenv for accessing environment variables
const dotenv = require('dotenv');
dotenv.config();

// initialize main project folder
app.use(express.static('./dist'));

// global variables
let appData = [];
let tripData = {};
const postalCodeApiKey = process.env.POSTAL_CODE_API_KEY;
const postalCodeURL = "http://api.geonames.org/postalCodeSearchJSON?";
const port = 8080;
console.log(postalCodeApiKey);

// start server
const server = app.listen(port,listening);

function listening(){
    console.log("Server started\n Active Port: ",port);
}

// POST handler to add trip-data to app
app.post("/addTrip", async (req,res) => {
    tripData = {};
    tripData['destination'] = req.body.destination;
    tripData['start'] = req.body.start;
    tripData['end'] = req.body.end;
    console.log(tripData);
    axios.get(postalCodeURL+"placename="+req.body.destination+"&username="+postalCodeApiKey)
        .then(function(response) {
            tripData['lat'] = response['data']['postalCodes'][0]['lat'];
            tripData['lng'] = response['data']['postalCodes'][0]['lng'];
            tripData['country'] = response['data']['postalCodes'][0]['countryCode'];
            console.log(tripData);
            appData.push(tripData);
            res.send(response['data']['postalCodes'][0]);
        })
        .catch(function(error) {
            console.log("Error: ",error);
        })
});