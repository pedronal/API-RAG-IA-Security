import {db} from "./sqliteConnection";

export async function initDatabase() {
    await db.schema
        .createTable("documents")
        .ifNotExists()
        .addColumn("id", "text", col => col.primaryKey())
        .addColumn("content", "text", col => col.notNull())
        .addColumn("hash", "text", col => col.notNull())
        .addColumn("created_at", "text", col => col.notNull())
        .execute()
}