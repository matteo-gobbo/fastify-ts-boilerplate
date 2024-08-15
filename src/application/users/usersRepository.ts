import type { User } from "./model";

export interface UsersRepository {
  findAll(): Promise<User[]>;
  findById(id: User["id"]): Promise<User | undefined>;
  createUser(email: User["email"]): Promise<User | undefined>;
}
