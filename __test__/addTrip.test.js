// import 
const app = require("../src/server/application");
const request = require("supertest")

describe("Check if serverside works", () => {
    test("Check addTrip", async ()=>{ 
        const dotenv = require("dotenv");
        dotenv.config();
        const req = { body:{ destination: "Copenhagen", start: "2022-01-05", end: "2022-01-08"}};
        let response = {}

        await request(app)
            .post("/addTrip")
            .send({destination: "Copenhagen", start:"2022-01-05", end:"2022-01-07"})
            .then((res,err) => {
                expect(res.body["destination"]).toBe("Copenhagen");
            })
    })
})
