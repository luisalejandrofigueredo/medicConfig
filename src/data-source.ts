import "reflect-metadata"
import { DataSource } from "typeorm"
import { confSerial } from "./entity/confSerial"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [confSerial],
    migrations: [],
    subscribers: [],
})
