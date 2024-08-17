import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { UserSchemas } from "../../../schemas";

const routes: FastifyPluginAsyncZod = async (app) => {
  app.delete(
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
      return await app.usersService.delete(Number(userId));
    }
  );
};

export default routes;
