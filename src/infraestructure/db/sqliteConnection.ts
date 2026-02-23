import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import {DataBaseTypes} from "./types";

export const db = new Kysely<DataBaseTypes>({
    dialect: new SqliteDialect({
        database: new Database("database.sqlite")
    })
})