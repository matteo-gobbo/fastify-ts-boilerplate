import type { User } from "./model";
import { NotFoundException } from "../commons/exceptions";
import { IUserRepository } from "./userRepository";
import { PaginatedResult, Pagination } from "../commons/models";
import { validatePagination } from "../commons/pagination";

export class UsersService {
  constructor(protected readonly userRepository: IUserRepository) {}

  async findAll(pagination: Pagination): Promise<PaginatedResult<User>> {
    validatePagination(pagination);
    return this.userRepository.findAll(pagination);
  }

  async findById(id: User["id"]): Promise<User> {
    const user = await this.userRepository.findById(id);
    this.handleNotFound(user, id);
    return user;
  }

  async createUser(email: User["email"]): Promise<User> {
    const user = await this.userRepository.create(email);
    return user;
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
