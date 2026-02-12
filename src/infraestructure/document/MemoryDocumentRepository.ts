import {DocumentRepository} from "../../domain/document/DocumentRepository";
import {StoredDocument} from "../../domain/document/StoredDocument";

export class MemoryDocumentRepository implements DocumentRepository {
    storage: Map<string, StoredDocument> = new Map();

    async save(document: StoredDocument): Promise<void> {
        this.storage.set(document.id, document);
    };

    async findById(id: string): Promise<StoredDocument | null> {
        return this.storage.get(id) ?? null;
    }
}