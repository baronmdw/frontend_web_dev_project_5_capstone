// global variables
const appData = [];
const projectData = {};

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

// initialize main project folder
app.use(express.static('website'));

const port = 8080;

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

app.get("/getData",getData);
function getData (req,res) {
    res.send(projectData);
}