import { FastifyInstance } from "fastify";
import {IngestDocumentUseCase} from "../domain/document/IngestDocumentUseCase";

export function registerDocumentRoutes(
    app: FastifyInstance,
    useCase: IngestDocumentUseCase
) {
    app.post('/documents', async (request, reply) => {

        const body = request.body as {content: string, actor: string};

        const result = await useCase.execute(body.content, body.actor);

        return reply.status(201).send(result);
    })
}