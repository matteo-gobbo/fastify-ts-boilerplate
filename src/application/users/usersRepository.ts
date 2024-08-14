import type { User } from "./model";

export interface UsersRepository {
  findById(id: User["id"]): Promise<User | undefined>;
}
