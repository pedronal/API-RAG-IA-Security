import Fastify from 'fastify';
import {WebCryptoIntegrityService} from "./infraestructure/integrity/WebCryptoIntegrityService";
import {ConsoleAuditService} from "./infraestructure/audit/ConsoleAuditService";
import {MemoryDocumentRepository} from "./infraestructure/document/MemoryDocumentRepository";
import {IngestDocumentUseCase} from "./domain/document/IngestDocumentUseCase";
import {registerDocumentRoutes} from "./api/DocumentsRoutes";

async function bootstrap(): Promise<void> {

    const app = Fastify({logger: true});

    const integrity = new WebCryptoIntegrityService();
    const audit = new ConsoleAuditService();
    const repository = new MemoryDocumentRepository();

    const useCase = new IngestDocumentUseCase(integrity, audit, repository);

    registerDocumentRoutes(app, useCase);

    await app.listen({port: 3000});
}

bootstrap();