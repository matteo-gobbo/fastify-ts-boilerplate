import { z } from "zod";

export const UsersQuery = z.object({
  offset: z.optional(z.string()),
  limit: z.optional(z.string()),
});
