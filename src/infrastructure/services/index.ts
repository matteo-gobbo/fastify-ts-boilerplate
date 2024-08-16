import fp from "fastify-plugin";
import { UsersService } from "../../application/users/usersService";
import { UsersDao } from "../dao/usersDao";
import { IUserRepository } from "../../application/users/userRepository";

declare module "fastify" {
  interface FastifyInstance {
    usersService: UsersService;
  }
}

export default fp(async (fastify) => {
  const usersRepository: IUserRepository = new UsersDao(fastify.prisma);
  const usersService = new UsersService(usersRepository);
  fastify.decorate("usersService", usersService);
});
