import { updateDOM } from "../src/client/js/app"

describe("Check if function works", () => {
    test("Checkname", async ()=>{

        document.body.innerHTML = `<div class="bodyContent">
        <div class="inputField card card-shadow">
            <form id="newTrip">
                <label for="destination">Trip will go to:</label>
                <input type="text" id="destination" name="destination" value="" placeholder="Destination" class="card-shadow">
                <label for="startDate">Trip will start:</label>
                <input type="date" id="startDate" name="startDate" class="card-shadow">
                <label for="endDate">Trip will end:</label>
                <input type="date" id="endDate" name="endDate" class="card-shadow">
            </form>
            <button id="enterTrip" class="card-shadow">Add Trip</button>
        </div>
        <div class="card contentCard card-shadow">
            <img src="./images/Paris_beetle.jpg" class="cropped-img" />
            <div class="informationContent">
                <div class="tripHeader">
                    <img src="https://flagcdn.com/w320/fr.png">
                    <h2>Trip to Paris</h2>
                </div>
                <div class="time">
                    <h3>Date</h3>
                    <p>10.02.2023 til 17.02.2023</p>
                </div>
                <div class="weatherForecast">
                    <h3>Weather Forecast</h3>
                    <p>Mostly funny</p>
                </div>
            </div>
        </div>
    </div>
        `
         const inputFile={
               destination: 'Copenhagen',
               start: '2023-01-07',
               end: '2023-01-09',
               lat: 55.70715937035772,
               lng: 12.572007572458817,
               countryCode: 'DK',
               flagURL: 'https://flagcdn.com/w320/dk.png',
               countryName: 'Denmark',
               forecast: 'Overcast clouds',
               temperature: 5,
               tempMax: 5.9,
               tempMin: 4.4,
               imgURL: 'https://pixabay.com/get/g0472bcf926a8dfa43b00c1bbfa14ccee443560b802b40e09d5d360cac04c450d2f4e7b844657c405a206a3de8b9d264addc4d84d02ace5cf7ef225982d94649a_640.jpg'
             }

        updateDOM(inputFile);
        const heading = document.querySelector("h2");
        expect(heading.textContent).toContain("Copenhagen");
    })
})