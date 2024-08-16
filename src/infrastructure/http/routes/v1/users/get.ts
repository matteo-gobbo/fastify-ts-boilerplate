import { UserSchemas } from "../../../schemas";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.withTypeProvider<ZodTypeProvider>().get(
    "/:userId",
    {
      schema: {
        params: UserSchemas.Params.UserId,
        response: {
          200: UserSchemas.Bodies.User,
        },
      },
    },
    async ({ params: { userId } }) => {
      return await app.usersService.findById(Number(userId));
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      schema: {
        querystring: UserSchemas.Queries.UsersQuery,
        response: {
          200: UserSchemas.Bodies.PaginatedUsers,
        },
      },
    },
    async ({ query: { limit = 10, offset = 0 } }) => {
      return await app.usersService.findAll({
        limit: Number(limit),
        offset: Number(offset),
      });
    }
  );
}
