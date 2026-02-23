import {DocumentRepository} from "../../domain/document/DocumentRepository";
import {StoredDocument} from "../../domain/document/StoredDocument";
import {db} from "../db/sqliteConnection";

export class SqliteDocumentRepository implements DocumentRepository {

    async save(document: StoredDocument): Promise<void> {
        await db.insertInto("documents")
            .values({
                id: document.id,
                content: document.content,
                hash: document.hash,
                created_at: document.createdAt.toISOString(),
            })
            .execute();
    }

    async findById(id: string): Promise<StoredDocument | null > {
        const row = await db.selectFrom("documents")
            .selectAll()
            .where("id", "=" ,id)
            .executeTakeFirst();
        if (!row) {
            return null;
        }

        return new StoredDocument(row.id, row.content, row.hash, new Date(row.created_at));
    }
}