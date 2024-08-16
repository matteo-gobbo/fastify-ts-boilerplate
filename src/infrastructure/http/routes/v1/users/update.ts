import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { UserSchemas } from "../../../schemas";

const routes: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    "/:userId",
    {
      schema: {
        params: UserSchemas.Params.UserId,
        body: UserSchemas.Bodies.CreateUser,
        response: {
          200: UserSchemas.Bodies.User,
        },
      },
    },
    async ({ params: { userId }, body: { email } }) => {
      return await app.usersService.update(Number(userId), email);
    }
  );
};

export default routes;
