import z from 'zod';

export const updateClassStatisticRequestSchema = z.object({
  maleStudents: z.number().min(0),
  femaleStudents: z.number().min(0),
});

export type UpdateClassStatisticRequest = z.infer<typeof updateClassStatisticRequestSchema>;
