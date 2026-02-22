import {StoredDocument} from "./StoredDocument";
import {IntegrityService} from "../integrity/IntegrityService";
import {AuditService} from "../audit/AuditService";
import {DocumentRepository} from "./DocumentRepository";
import {AuditEventFactory} from "../audit/AuditEventFactory";

export class IngestDocumentUseCase {
    constructor(
        private readonly integrity: IntegrityService,
        private readonly audit: AuditService,
        private readonly repository: DocumentRepository
    ) {}


    async execute(content: string, actor: string): Promise<{id: string; hash: string}> {
        const hash = await this.integrity.generate(content);
        const document: StoredDocument = {
            id: crypto.randomUUID(),
            content,
            hash,
            createdAt: new Date(),
        }

        await this.repository.save(document);

        const storedEvent = AuditEventFactory.documentStored(document.id, actor);
        await this.audit.record(storedEvent)

        return {id: document.id, hash: hash};
    }
}