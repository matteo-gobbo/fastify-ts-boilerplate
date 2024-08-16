import { PaginatedResult, Pagination, SortBy } from "../commons/models";
import type { User } from "./model";

export interface IUserRepository {
  findAll(
    pagination: Pagination,
    sort: SortBy<User>
  ): Promise<PaginatedResult<User>>;
  findById(id: User["id"]): Promise<User | null>;
  create(email: User["email"]): Promise<User>;
  delete(id: User["id"]): Promise<User>;
  update(id: User["id"], email: User["email"]): Promise<User>;
}
