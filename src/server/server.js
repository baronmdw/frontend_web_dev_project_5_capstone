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
const appData = [];
const projectData = {};
const postalCodeApiKey = process.env.POSTAL_CODE_API_KEY;
const postalCodeURL = "http://api.geonames.org/postalCodeSearchJSON?";
const port = 8080;
console.log(postalCodeApiKey);

// start server
const server = app.listen(port,listening);

function listening(){
    console.log("Server started\n Active Port: ",port);
}

app.get("/salve",(req,res)=>{res.send("Hello World-again")});

// POST handler to add data to app
app.post("/addDay",addDay);
function addDay (req,res) {
    projectData["date"]= req.body.date;
    projectData["weather"]= req.body.weather.weather[0].main;
    projectData["temperature"]= req.body.weather.main.temp;
    projectData["unitStyle"]= req.body.unit;
    projectData["place"]= req.body.weather.name;
    projectData["mood"]= req.body.mood;
    
    appData.push(projectData);
    console.log("Data pushed: ",projectData);
    res.send(projectData);
}

app.post("/getPlace", async (req,res) => {
    console.log(req.body.start, req.body.end);
    axios.get(postalCodeURL+"placename="+req.body.destination+"&username="+postalCodeApiKey)
        .then(function(response) {
            res.send(response['data']['postalCodes'][0]);
        })
        .catch(function(error) {
            console.log("Error: ",error);
        })
});