import fp from "fastify-plugin";
import { UsersService } from "../../application/users/usersService";
import { UsersRepository } from "../../application/users/usersRepository";
import { UsersDao } from "../dao/usersDao";

declare module "fastify" {
  interface FastifyInstance {
    usersService: UsersService;
  }
}

export default fp(async (fastify) => {
  const usersRepository: UsersRepository = new UsersDao();
  const usersService = new UsersService(usersRepository);
  fastify.decorate("usersService", usersService);
});
