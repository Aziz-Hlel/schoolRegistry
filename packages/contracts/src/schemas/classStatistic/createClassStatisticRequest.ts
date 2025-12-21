import z from 'zod';

export const createClassStatisticRequestSchema = z.object({
  maleStudents: z.number().min(0),
  femaleStudents: z.number().min(0),
  componentId: z.uuid(),
});

export type CreateClassStatisticRequest = z.infer<typeof createClassStatisticRequestSchema>;
