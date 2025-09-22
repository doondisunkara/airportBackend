import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(process.cwd(), "database.sqlite"),
    synchronize: true,
    logging: ["query", "error"],
    entities: [__dirname + "/entity/*.ts"],
    migrations: [],
    subscribers: [],
})