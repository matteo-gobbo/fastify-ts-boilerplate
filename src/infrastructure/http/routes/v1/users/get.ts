import { UserSchemas } from "../../../schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const routes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/:userId",
    {
      schema: {
        tags: ["Users"],
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

  app.get(
    "/",
    {
      schema: {
        tags: ["Users"],
        querystring: UserSchemas.Queries.UsersQuery,
        response: {
          200: UserSchemas.Bodies.PaginatedUsers,
        },
      },
    },
    async ({ query: { limit, offset, sortBy } }) => {
      return await app.usersService.findAll(
        {
          limit: Number(limit),
          offset: Number(offset),
        },
        sortBy as any // TODO: remove "as any"
      );
    }
  );
};

export default routes;
