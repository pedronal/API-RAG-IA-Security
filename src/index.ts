import Fastify from 'fastify';
import {WebCryptoIntegrityService} from "./infraestructure/integrity/WebCryptoIntegrityService";
import {ConsoleAuditService} from "./infraestructure/audit/ConsoleAuditService";
import {MemoryDocumentRepository} from "./infraestructure/document/MemoryDocumentRepository";
import {IngestDocumentUseCase} from "./domain/document/IngestDocumentUseCase";
import {registerDocumentRoutes} from "./api/DocumentsRoutes";
import {initDatabase} from "./infraestructure/db/initDatabase";
import {SqliteDocumentRepository} from "./infraestructure/document/SqliteDocumentRepository";

async function bootstrap(): Promise<void> {

    await initDatabase();

    const app = Fastify({
        logger: true,
        ajv: {
            customOptions: {
                coerceTypes: false,
            }
        }
    });

    const integrity = new WebCryptoIntegrityService();
    const audit = new ConsoleAuditService();

    const useCaseMemory = new IngestDocumentUseCase(
        integrity,
        audit,
        new MemoryDocumentRepository());

    const useCaseSqlite = new IngestDocumentUseCase(
        integrity,
        audit,
        new SqliteDocumentRepository());

    registerDocumentRoutes(app, useCaseMemory, "/documents-memory");
    registerDocumentRoutes(app, useCaseSqlite, "/documents-sqlite");

    await app.listen({port: 3000});
}

bootstrap();