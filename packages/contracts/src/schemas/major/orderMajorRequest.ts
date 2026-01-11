import z from 'zod';

export const orderMajorRequestSchema = z.object({
  majors: z.array(z.uuid()),
});
export type OrderMajorRequest = z.infer<typeof orderMajorRequestSchema>;
