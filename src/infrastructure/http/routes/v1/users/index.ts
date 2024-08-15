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

  app.post(
    "/",
    async (
      request: FastifyRequest<{
        Body: { email: string };
      }>
    ) => {
      return await app.usersService.createUser(request.body.email);
    }
  );
}
