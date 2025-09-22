"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AirportRouter_1 = __importDefault(require("./router/AirportRouter"));
const seedDatabase_1 = __importDefault(require("./seedDatabase"));
dotenv_1.default.config();
data_source_1.AppDataSource.initialize().then(async () => {
    console.log("Database intialized successfully.");
    await (0, seedDatabase_1.default)();
    const app = (0, express_1.default)();
    app.use("/api/airport", AirportRouter_1.default);
    app.use((req, res) => res.status(404).json({ status: "Failed", message: "Not Found" }));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map