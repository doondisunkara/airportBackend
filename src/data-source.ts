import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(process.cwd(), "database.sqlite"),
    synchronize: true,
    logging: ["query", "error"],
    entities: [path.join(__dirname, "entity", "*.{ts,js}")],
    migrations: [],
    subscribers: [],
})