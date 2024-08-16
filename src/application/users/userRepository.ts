import { PaginatedResult, Pagination } from "../commons/models";
import type { User } from "./model";

export interface IUserRepository {
  findAll(pagination: Pagination): Promise<PaginatedResult<User>>;
  findById(id: User["id"]): Promise<User | null>;
  create(email: User["email"]): Promise<User>;
}
