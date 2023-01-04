// setup express environment
const express = require("express");
const app = express();

// dependencies and middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cross origin
const cors = require("cors");
app.use(cors());

// axios for http requests
const axios = require("axios");

// dotenv for accessing environment variables
const dotenv = require("dotenv");
dotenv.config();

// initialize main project folder
app.use(express.static("./dist"));

// global variables
let appData = [];
let tripData = {};
const postalCodeApiKey = process.env.POSTAL_CODE_API_KEY;
const postalCodeURL = "http://api.geonames.org/postalCodeSearchJSON?";
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const pixabayApiKey = process.env.PIXABAY_API_KEY;
const pixabayURL = "https://pixabay.com/api/?";
const restCountriesURL = "https://restcountries.com/v3.1/alpha/";
const port = 8080;

// start server
const server = app.listen(port,listening);

function listening(){
    console.log("Server started\n Active Port: ",port);
}

// POST handler to add trip-data to app
app.post("/addTrip", async (req,res) => {
    tripData = {};
    tripData["destination"] = req.body.destination;
    tripData["start"] = req.body.start;
    tripData["end"] = req.body.end;
    console.log(tripData);
    axios.get(postalCodeURL+"placename="+req.body.destination+"&username="+postalCodeApiKey)
        .then(function(response) {
            tripData["lat"] = response["data"]["postalCodes"][0]["lat"];
            tripData["lng"] = response["data"]["postalCodes"][0]["lng"];
            tripData["countryCode"] = response["data"]["postalCodes"][0]["countryCode"];
            axios.get(restCountriesURL+tripData["countryCode"])
                .then((re) => {
                    tripData["flagURL"] = re["data"][0]["flags"]["png"]
                    tripData["countryName"] = re["data"][0]["name"]["common"]                
                    axios.get(weatherbitURL+"lat="+tripData["lat"]+"&lon="+tripData["lng"]+"&key="+weatherbitApiKey)
                        .then(function(respo){
                            let forecast = "not available";
                            let temperature = "";
                            let tempMax = "";
                            let tempMin ="";
                            for (let dateArtefact of respo["data"]["data"]){
                                if (dateArtefact["valid_date"] === tripData["start"]){
                                    forecast = dateArtefact["weather"]["description"];
                                    temperature = dateArtefact["temp"];
                                    tempMax = dateArtefact["max_temp"];
                                    tempMin = dateArtefact["min_temp"];
                                }
                            }
                            tripData["forecast"] = forecast;
                            tripData["temperature"] = temperature;
                            tripData["tempMax"] = tempMax;
                            tripData["tempMin"] = tempMin;
                            axios.get(pixabayURL+"key="+pixabayApiKey+"&q="+tripData["destination"]+"%20"+tripData["countryName"])
                                .then(function(resp){
                                    if (resp["data"]["total"]>0){
                                    const imgURL = resp["data"]["hits"][0]["webformatURL"];
                                    tripData["imgURL"] = imgURL;
                                    console.log(tripData);
                                    appData.push(tripData);
                                    res.send(tripData);
                                    } else {
                                        axios.get(pixabayURL+"key="+pixabayApiKey+"&q="+tripData["countryName"])
                                            .then((respon)=>{
                                                const imgURL = respon["data"]["hits"][0]["webformatURL"];
                                                tripData["imgURL"] = imgURL;
                                                console.log(tripData);
                                                appData.push(tripData);
                                                res.send(tripData);
                                            })
                                    }
                                })
                })
            })
        })
        .catch(function(error) {
            console.log("Error: ",error);   
        })
        .then(function(){
            
        })
});