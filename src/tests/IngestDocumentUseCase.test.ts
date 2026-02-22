import {describe, it, expect} from 'vitest';
import {WebCryptoIntegrityService} from "../infraestructure/integrity/WebCryptoIntegrityService";
import {ConsoleAuditService} from "../infraestructure/audit/ConsoleAuditService";
import {MemoryDocumentRepository} from "../infraestructure/document/MemoryDocumentRepository";
import {IngestDocumentUseCase} from "../domain/document/IngestDocumentUseCase";

describe('IngestDocumentUseCaseTest', async () => {

    it('Ingest a document and return a id+ hash', async () => {

        const integrity = new WebCryptoIntegrityService();
        const audit = new ConsoleAuditService();
        const repository = new MemoryDocumentRepository();

        const useCase = new IngestDocumentUseCase(
            integrity,
            audit,
            repository,
        );

        const result = await useCase.execute('Hello world', 'Pedro');

        expect(typeof result.id).toBe('string');
        expect(result.id).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        );
        expect(typeof result.hash).toBe('string');
        expect(result.hash.length).toBe(64);
        expect(result.hash).toMatch(/^[a-f0-9]+$/);
    })
})