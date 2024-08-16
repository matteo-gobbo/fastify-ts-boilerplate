import type { User } from "./model";
import { NotFoundException } from "../commons/exceptions";
import { IUserRepository } from "./userRepository";
import { PaginatedResult, Pagination, SortBy } from "../commons/models";
import { Prisma } from "@prisma/client";
import { PRISMA_ERROR_CODES } from "../../../prisma/errorCodes";

export class UsersService {
  constructor(protected readonly userRepository: IUserRepository) {}

  async findAll(
    pagination: Pagination,
    sortBy: SortBy<User>
  ): Promise<PaginatedResult<User>> {
    return this.userRepository.findAll(pagination, sortBy);
  }

  async findById(id: User["id"]): Promise<User> {
    const user = await this.userRepository.findById(id);
    this.handleNotFound(user, id);
    return user;
  }

  async create(email: User["email"]): Promise<User> {
    return await this.userRepository.create(email);
  }

  async delete(id: User["id"]): Promise<User> {
    try {
      return await this.userRepository.delete(id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_ERROR_CODES.P2025) this.handleNotFound(null, id);
      }
      throw new Error("Generic error");
    }
  }

  async update(id: User["id"], email: User["email"]): Promise<User> {
    try {
      return await this.userRepository.update(id, email);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_ERROR_CODES.P2025) this.handleNotFound(null, id);
      }
      throw new Error("Generic error");
    }
  }

  private handleNotFound(
    user: User | null,
    id: User["id"]
  ): asserts user is User {
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
  }
}
