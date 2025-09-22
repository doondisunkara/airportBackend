"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: path_1.default.join(process.cwd(), "database.sqlite"),
    synchronize: true,
    logging: ["query", "error"],
    entities: [__dirname + "/entity/*.ts"],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map