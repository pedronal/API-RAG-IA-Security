import { FastifyInstance } from "fastify";
import {IngestDocumentUseCase} from "../domain/document/IngestDocumentUseCase";
import {DocumentResponseDTO} from "./dto/DocumentResponseDTO";

export function registerDocumentRoutes(
    app: FastifyInstance,
    useCase: IngestDocumentUseCase
) {
    app.post<{
        Body: {
            content: string;
            actor: string;
        }
    }>('/documents', {
        schema: {
            body: {
                type: 'object',
                required: ['content', 'actor'],
                properties: {
                    content: { type: 'string' },
                    actor: { type: 'string' },
                }
            }
        }
    }, async (request, reply) => {

        const entity = await useCase.execute(request.body.content, request.body.actor);

        const response: DocumentResponseDTO = {
            id: entity.id,
            hash: entity.hash
        }

        return reply.status(201).send(response);
    })
}