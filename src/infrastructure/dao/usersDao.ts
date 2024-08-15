import { PrismaClient } from "@prisma/client";
import { User } from "../../application/users/model";
import { UsersRepository } from "../../application/users/usersRepository";

export class UsersDao implements UsersRepository {
  constructor(protected readonly db: PrismaClient) {}

  async findAll(): Promise<User[]> {
    const users = this.db.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const user = this.db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      },
    });
    return user;
  }

  async createUser(email: string): Promise<User> {
    const user = this.db.user.create({
      data: {
        email,
      },
    });
    return user;
  }
}
