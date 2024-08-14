import { FastifyInstance, FastifyRequest } from "fastify";

export default async function (app: FastifyInstance) {
  app.get(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: { id: string };
      }>
    ) => {
      return await app.usersService.findById(request.params.id);
    }
  );
}
