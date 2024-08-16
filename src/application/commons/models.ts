export type Pagination = {
  offset: number;
  limit: number;
};

export type PaginatedResult<T> = {
  total: number;
  data: T[];
};
