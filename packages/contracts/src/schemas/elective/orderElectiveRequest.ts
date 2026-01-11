import z from 'zod';

export const orderElectiveRequestSchema = z.object({
  electives: z.array(z.uuid()),
});
export type OrderElectiveRequest = z.infer<typeof orderElectiveRequestSchema>;
