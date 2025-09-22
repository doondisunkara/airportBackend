import { AppDataSource } from "../data-source";

import express from "express";
import NodeCache from "node-cache";

import { Airport } from "../entity/Airport";

const airportRepo = AppDataSource.getRepository(Airport);

const AirportRouter = express.Router();

const cache = new NodeCache({stdTTL: 60 * 15});

const getFormattedData = (data) => ({
        airport: {
            id: data.id,
            icao_code: data.icao_code,
            iata_code: data.iata_code,
            name: data.name,
            type: data.type,
            latitude_deg: data.latitude_deg,
            longitude_deg: data.longitude_deg,
            elevation_ft: data.elevation_ft,
            address: {
                city: data.city ? {
                    id: data.city.id,
                    name: data.city.name,
                    country_id: data.city.country_id,
                    is_active: data.city.is_active,
                    lat: data.city.lat,
                    long: data.city.long
                } : null,
                country: data.city ? data.city.country : null
            }
        }
    })

const validateIATACode = (req, res, next) => {
        try{
            let {iata_code} = req.params;
            if (iata_code.length != 3){
                throw new Error("Invalid IATA Code, Code length should be equal to 3.");
            }

            iata_code = iata_code.toLocaleUpperCase();
            if(/^[A-Z]+$/.test(iata_code)){
                req.params.iata_code = iata_code;
                next();
            }else{
                throw new Error("Invalid IATA Code, COde should only contain alphabets.");
            }
        }catch(err){
            res.status(400).json({
                status: "Failed",
                message: err.message
            })
        }
    }


AirportRouter.get("/:iata_code", validateIATACode, async(req, res) => {
        try{
            const {iata_code} = req.params;

            const cacheData = cache.get(iata_code);
            if (cacheData){
                res.status(200).json(cacheData);
            }else{
                const data = await airportRepo.findOne({
                    relations: {
                        city: {
                            country: true
                        }
                    },
                    select: {
                        id: true,
                        icao_code: true,
                        iata_code: true,
                        name: true,
                        type: true,
                        latitude_deg: true,
                        longitude_deg: true,
                        elevation_ft: true
                    },
                    where: {
                        iata_code
                    }
                })

                if (data) {
                    const formattedData = getFormattedData(data);
                    cache.set(iata_code, formattedData);
                    res.status(200).json(formattedData);
                }else{
                    res.status(404).json({
                        status: "Failed",
                        message: "Not Found"
                    })
                }
            }
        }catch(err){
            res.status(500).json({
                status: "Failed",
                message: err.message
            })
        }
        
    })

export default AirportRouter;