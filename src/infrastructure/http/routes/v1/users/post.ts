import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { UserSchemas } from "../../../schemas";
import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.withTypeProvider<ZodTypeProvider>().post(
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
}
