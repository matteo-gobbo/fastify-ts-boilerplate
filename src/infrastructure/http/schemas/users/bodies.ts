import { z } from "zod";

export const CreateUser = z.object({
  email: z.string(),
});

export const User = z.intersection(
  z.object({
    id: z.number(),
  }),
  CreateUser
);

export const PaginatedUsers = z.object({
  total: z.number(),
  data: z.array(User),
});
