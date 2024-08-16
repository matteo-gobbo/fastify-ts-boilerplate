import { SortBy } from "../../application/commons/models";

export const buildOrderBy = <T>(sortBy: SortBy<T>) => {
  const split = sortBy.split(".");
  return {
    [split[0]]: [split[1]],
  };
};
