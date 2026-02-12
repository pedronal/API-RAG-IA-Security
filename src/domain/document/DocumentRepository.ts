import {StoredDocument} from "./StoredDocument";

export interface DocumentRepository {
    save(document: StoredDocument): Promise<void>;
    findById(id: string): Promise<StoredDocument | null>;
}