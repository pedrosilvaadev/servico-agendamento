import { z } from "zod";

export const getDashboardDataSchema = z
  .object({
    userId: z.string().cuid(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) {
        return true;
      }

      return data.from <= data.to;
    },
    {
      message: "from must be earlier than or equal to to.",
      path: ["from"],
    },
  );

export type GetDashboardDataInput = z.infer<typeof getDashboardDataSchema>;
