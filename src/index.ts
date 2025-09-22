import { AppDataSource } from "./data-source";

import express from "express";
import dotenv from "dotenv";

import AirportRouter from "./router/AirportRouter";
import seedDatabase from "./seedDatabase";

dotenv.config();

AppDataSource.initialize().then(async () => {

    console.log("Database intialized successfully.");
    
    await seedDatabase();


    const app = express();

    app.use("/api/airport", AirportRouter);

    app.use((req, res) => res.status(404).json({status: "Failed", message: "Not Found"}));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT , () => console.log(`Server running on port ${PORT}`));
    

}).catch(error => console.log(error))
