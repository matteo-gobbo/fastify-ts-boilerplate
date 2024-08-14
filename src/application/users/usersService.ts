import type { User } from "./model";
import { NotFoundException } from "../commons/exceptions";
import { UsersRepository } from "./usersRepository";

export class UsersService {
  constructor(protected readonly usersRepository: UsersRepository) {}

  async findById(id: User["id"]): Promise<User> {
    const user = await this.usersRepository.findById(id);
    this.handleNotFound(user, id);
    return user;
  }

  private handleNotFound(
    user: User | undefined,
    id: User["id"]
  ): asserts user is User {
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
  }
}
