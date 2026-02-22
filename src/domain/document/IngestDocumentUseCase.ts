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


    async execute(content: string, actor: string): Promise<StoredDocument> {
        const hash = await this.integrity.generate(content);
        const document: StoredDocument = new StoredDocument(
            crypto.randomUUID(),
            content,
            hash,
            new Date(),
    )

        await this.repository.save(document);

        const storedEvent = AuditEventFactory.documentStored(document.id, actor);
        await this.audit.record(storedEvent)

        return document;
    }
}