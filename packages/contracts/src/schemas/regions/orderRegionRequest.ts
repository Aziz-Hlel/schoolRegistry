import z from 'zod';

export const OrderRegionRequestSchema = z.object({
  regions: z.array(z.uuid()),
});

export type OrderRegionRequest = z.infer<typeof OrderRegionRequestSchema>;
