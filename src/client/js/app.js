const baseURL = "http://localhost:8080/"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const postalCodeURL = "http://api.geonames.org/postalCodeSearchJSON?"
let unitStyle = "imperial";
const postalCodeApiKey = "";

const postData = async (url="", data={}) => {
    // This Function sends a post request to the URL that was handed over including the data in the caller as JSON object
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
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
    // This function reads out the inputs on the page and retrieves the weather data from the openweathermap API
    // Get Zip Code and fill in with placeholder for Manhattan if no user entry was given
    let destinationName = document.getElementById("destination").value;
    if (!destinationName) {

    // TODO: Change functionalitiy if empty

      destinationName = document.getElementById("destination").placeholder;
    }

    // Read Start and End Date of trip
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate");

    // Contact Weathermap API and retrieve Data
    const geoData = getData(postalCodeURL+"placename="+destinationName+"&username="+postalCodeApiKey)
    .then(function(geoData){
        // If weather was fetched successfully: Post to Database
        console.log(geoData)
    })
//     .then(()=>{
//         // Update UI Elements with the received data
// })
}

function getTemperatureUnit(typeString =""){
    // This Function sets the unit in the temperature based on the unitType that was used (°C, °F or K)
    switch(typeString) {
        case 'imperial':
            unit=" °F";
            break;
        case 'metric':
            unit=" °C";
            break;
        case 'standard':
            unit=" K";
            break;
    }
    document.getElementById("temp").innerHTML = document.getElementById("temp").innerHTML+unit;
}

function sayHello(){
    const destination = document.getElementById("destination").value;
    alert(postalCodeURL+"placename="+destination+"&username="+postalCodeApiKey);
    getPostalCode();
}

export {postData, getData, getPostalCode, getTemperatureUnit, sayHello};