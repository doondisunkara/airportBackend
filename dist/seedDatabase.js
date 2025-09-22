"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const Airport_1 = require("./entity/Airport");
const City_1 = require("./entity/City");
const Country_1 = require("./entity/Country");
const country_json_1 = __importDefault(require("../data/country.json"));
const city_json_1 = __importDefault(require("../data/city.json"));
const airport_json_1 = __importDefault(require("../data/airport.json"));
const seedDatabase = async () => {
    const countryRepo = data_source_1.AppDataSource.getRepository(Country_1.Country);
    const cityRepo = data_source_1.AppDataSource.getRepository(City_1.City);
    const airportRepo = data_source_1.AppDataSource.getRepository(Airport_1.Airport);
    const addCountriesDataToDatabase = async (country) => {
        const countryObj = countryRepo.create(country);
        await countryRepo.save(countryObj);
    };
    const addCitiesToDatabase = async (city) => {
        const countryExists = await countryRepo.findOneBy({ id: city.country_id });
        // If country doesn't exist, remove country_id so it becomes NULL in DB
        if (!countryExists) {
            delete city.country_id;
        }
        const cityObj = cityRepo.create(city);
        await cityRepo.save(cityObj);
    };
    const addAirportsToDatabase = async (airport) => {
        const cityExists = await cityRepo.findOneBy({ id: airport.city_id });
        // If city doesn't exist, remove city_id so it becomes NULL in DB
        if (!cityExists) {
            delete airport.city_id;
        }
        const airportObj = airportRepo.create(airport);
        await airportRepo.save(airportObj);
    };
    const countryDataInsertion = async () => {
        const existingCountries = await countryRepo.count();
        if (existingCountries == 0) {
            country_json_1.default.map(country => addCountriesDataToDatabase(country));
            console.log("Countries Data Added Successfully");
        }
    };
    const cityDataInsertion = async () => {
        const existingCities = await cityRepo.count();
        if (existingCities == 0) {
            city_json_1.default.map(each => {
                const city = {
                    ...each, is_active: (each.is_active == "TRUE") ? true : false,
                };
                addCitiesToDatabase(city);
            });
            console.log("Cities Data Added Successfully");
        }
    };
    const airportDataInsertion = async () => {
        const existingAirports = await airportRepo.count();
        if (existingAirports == 0) {
            airport_json_1.default.map(each => addAirportsToDatabase(each));
            console.log("Airports added successfully");
        }
    };
    // Inserting Initial Data into the Database
    countryDataInsertion();
    cityDataInsertion();
    airportDataInsertion();
};
exports.default = seedDatabase;
//# sourceMappingURL=seedDatabase.js.map