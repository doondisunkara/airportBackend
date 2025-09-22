import { AppDataSource } from "./data-source";

import { Airport} from "./entity/Airport";
import { City} from "./entity/City";
import { Country} from "./entity/Country";


import countries from "../data/country.json";
import cities from "../data/city.json";
import airports from "../data/airport.json";

const seedDatabase = async() => {
    const countryRepo = AppDataSource.getRepository(Country);
    const cityRepo = AppDataSource.getRepository(City);
    const airportRepo = AppDataSource.getRepository(Airport);

    const addCountriesDataToDatabase = async(country) =>{
        const countryObj = countryRepo.create(country);
        await countryRepo.save(countryObj);
    }

    const addCitiesToDatabase = async (city) => {
        const countryExists = await countryRepo.findOneBy({id: city.country_id});

        // If country doesn't exist, remove country_id so it becomes NULL in DB
        if (!countryExists){
            delete city.country_id;
        }
        const cityObj = cityRepo.create(city);
        await cityRepo.save(cityObj);
    }

    const addAirportsToDatabase = async (airport) => {
        const cityExists = await cityRepo.findOneBy({ id: airport.city_id });

        // If city doesn't exist, remove city_id so it becomes NULL in DB
        if (!cityExists) {
            delete airport.city_id;
        }
        const airportObj = airportRepo.create(airport);
        await airportRepo.save(airportObj);
    }



    const countryDataInsertion = async() => {
        const existingCountries = await countryRepo.count();
        if (existingCountries == 0){
            countries.map(country => addCountriesDataToDatabase(country));
            console.log("Countries Data Added Successfully");
        }
    }

    const cityDataInsertion = async() => {
        const existingCities = await cityRepo.count();
        if (existingCities == 0){
            cities.map(each => {
            const city = {
                ...each, is_active: (each.is_active == "TRUE") ? true : false,
            }
            addCitiesToDatabase(city);
            })
            console.log("Cities Data Added Successfully");
        }
    }

    const airportDataInsertion = async() => {
        const existingAirports = await airportRepo.count();
        if (existingAirports == 0){
            airports.map(each => addAirportsToDatabase(each));
            console.log("Airports added successfully");
        }
    }

    // Inserting Initial Data into the Database
    countryDataInsertion();
    cityDataInsertion();
    airportDataInsertion();

}

export default seedDatabase;