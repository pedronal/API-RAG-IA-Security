import Fastify from 'fastify';
import {WebCryptoIntegrityService} from "./infraestructure/integrity/WebCryptoIntegrityService";
import {ConsoleAuditService} from "./infraestructure/audit/ConsoleAuditService";
import {MemoryDocumentRepository} from "./infraestructure/document/MemoryDocumentRepository";
import {IngestDocumentUseCase} from "./domain/document/IngestDocumentUseCase";

async function bootstrap() {

    const integrity = new WebCryptoIntegrityService();
    const audit = new ConsoleAuditService();
    const repository = new MemoryDocumentRepository();

    const useCase = new IngestDocumentUseCase(integrity, audit, repository);

    const result = await useCase.execute('Hello World', 'system')

    console.log('Result: ', result);
}