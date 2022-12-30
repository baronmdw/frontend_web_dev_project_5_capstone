const baseURL = "http://localhost:8080/"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const postalCodeURL = "http://api.geonames.org/postalCodeSearchJSON?"
let unitStyle = "imperial";
const postalCodeApiKey = "";

const postData = async (url="", data={}) => {
    // This Function sends a post request to the URL that was handed over including the data in the caller as JSON object
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    
    try {
        const retreivedData = await response.json();
        return retreivedData;
    } catch(error) {
        console.log("There was an error, it was following: ", error);
    };
}

const getData = async (url="") => {
    // This Function sends a get request to the URL that was handed over and returns the response
    const response = await fetch(url);
    try {
        const retreivedData = await response.json();
        return retreivedData;
    } catch(error) {
        console.log("Oops, that didn't quite go well. Error: ",error);
    };
};

function getPostalCode() {
    // This function reads out the inputs on the page and sends a post request to the backend
    // with the received response the DOM will be updated

    // Get Zip Code and fill in with placeholder for Manhattan if no user entry was given
    let destinationName = document.getElementById("destination").value;
    if (!destinationName) {

    // TODO: Change functionalitiy if empty

      destinationName = document.getElementById("destination").placeholder;
    }

    // Read Start and End Date of trip
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    // TODO: Error handling



    const sendData = {destination: destinationName, start:startDate, end:endDate};

    // Contact Backend API and retrieve Data from it
    const tripData = postData(baseURL+"addTrip/",sendData)
    .then(function(tripData){
        updateDOM(tripData);
        const formElement = document.getElementById("newTrip");
        formElement.reset()
    })
}

function updateDOM(inputData) {
    const headingElement = document.querySelector("h2");

    // TODO: add flag of country

    headingElement.textContent = `Trip to ${inputData["destination"]}, ${inputData["country"]}`;
    const dateElement = document.querySelector(".time > p");
    // set comparisondate (now) by setting Date Object which will by default take todays value
    const compareDate= new Date();
    const startDate = new Date(inputData["start"]);
    const endDate = new Date(inputData["end"]);
    // calculate difference of days between startdate and todays date by deviding difference [ms] by amount of ms per day
    const daysDiff = Math.ceil((startDate-compareDate)/(1000*60*60*24));
    const tripDiff = Math.ceil((endDate-startDate)/(1000*60*60*24)+1);
    dateElement.innerHTML = `${inputData["start"]} til ${inputData["end"]}.<br>Your trip will start in <b>${daysDiff} Days</b>!<br>You will be travelling for <b>${tripDiff} Days</b>!`;
    // update weather forecast element
    const weatherElement = document.querySelector(".weatherForecast > p");
    weatherElement.innerHTML = `<b>Weather</b>: ${inputData["forecast"]}<br><b>Min. Temparature</b>: ${inputData["temperature"]} °C<br><b>Min/Max</b>: ${inputData["tempMin"]}/${inputData["tempMax"]} °C`;
    // update image
    const imageElement = document.querySelector(".contentCard > img");
    imageElement.src = inputData["imgURL"];
}


export {postData, getData, getPostalCode };