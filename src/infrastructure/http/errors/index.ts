import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
  BadRequestException,
  NotFoundException,
} from "../../../application/commons/exceptions";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof NotFoundException) {
    return reply.notFound(error.message);
  }
  if (error instanceof BadRequestException) {
    return reply.badRequest(error.message);
  }

  reply.log.error(
    {
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      },
      error,
    },
    "Unhandled error occurred."
  );

  reply.code(500).send(error.message);
}
