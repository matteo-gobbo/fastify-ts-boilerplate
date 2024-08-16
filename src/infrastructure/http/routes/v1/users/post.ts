import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { UserSchemas } from "../../../schemas";

const routes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: UserSchemas.Bodies.CreateUser,
        response: {
          200: UserSchemas.Bodies.User,
        },
      },
    },
    async ({ body: { email } }) => {
      return await app.usersService.createUser(email);
    }
  );
};

export default routes;
