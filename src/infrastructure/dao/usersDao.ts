import { PrismaClient } from "@prisma/client";
import { User } from "../../application/users/model";
import { IUserRepository } from "../../application/users/userRepository";
import {
  PaginatedResult,
  Pagination,
  SortBy,
} from "../../application/commons/models";
import { buildOrderBy } from "./utils";

export class UsersDao implements IUserRepository {
  constructor(protected readonly db: PrismaClient) {}

  async findAll(
    pagination: Pagination,
    sortBy: SortBy<User>
  ): Promise<PaginatedResult<User>> {
    const usersQuery = this.db.user.findMany({
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: buildOrderBy(sortBy),
      select: {
        id: true,
        email: true,
      },
    });
    const countQuery = this.db.user.count();
    const [total, users] = await Promise.all([countQuery, usersQuery]);
    return {
      total,
      data: users,
    };
  }

  async findById(id: number): Promise<User | null> {
    return this.db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  async create(email: string): Promise<User> {
    return this.db.user.create({
      data: {
        email,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, email: string): Promise<User> {
    return this.db.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
  }
}
