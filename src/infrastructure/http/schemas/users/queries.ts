import { z } from "zod";
import { User } from "../../../../application/users/model";

const userKeys: (keyof User)[] = ["id", "email"];

export const UsersQuery = z.object({
  offset: z
    .string()
    .default("0")
    .transform((val, ctx) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '"offset" should be a valid number',
        });
        return z.NEVER;
      }
      return parsed;
    }),
  limit: z
    .string()
    .default("10")
    .transform((val, ctx) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '"limit" should be a valid number',
        });
        return z.NEVER;
      }
      return parsed;
    }),
  sortBy: z
    .string()
    .regex(new RegExp(`^(${userKeys.join("|")})\\.(asc|desc)$`), {
      message: '"sortBy" should be a valid item',
    })
    .default("id.asc"),
});
