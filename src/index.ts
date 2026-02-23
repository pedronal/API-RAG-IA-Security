import Fastify from 'fastify';
import {WebCryptoIntegrityService} from "./infraestructure/integrity/WebCryptoIntegrityService";
import {ConsoleAuditService} from "./infraestructure/audit/ConsoleAuditService";
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

    registerDocumentRoutes(app,  new IngestDocumentUseCase(
        new WebCryptoIntegrityService(),
        new ConsoleAuditService(),
        new SqliteDocumentRepository()));

    await app.listen({port: 3000});
}

bootstrap();