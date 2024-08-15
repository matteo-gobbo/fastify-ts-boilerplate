import { User } from "../../application/users/model";
import { UsersRepository } from "../../application/users/usersRepository";

export class UsersDao implements UsersRepository {
  async findById(id: number): Promise<User | undefined> {
    // I can call the db or external apis here
    return { id, email: "matteo.gobbo@conio.com" };
  }

  async createUser(email: string): Promise<User | undefined> {
    return { id: 1, email };
  }
}
