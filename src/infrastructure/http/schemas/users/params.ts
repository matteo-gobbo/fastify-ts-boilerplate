import { z } from "zod";

export const UserId = z.object({
  userId: z.string(),
});
