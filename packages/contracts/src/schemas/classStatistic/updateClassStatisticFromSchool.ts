import z from 'zod';

const baseStatisticSchema = {
  maleStudents: z.number().int().min(0),
  femaleStudents: z.number().int().min(0),
};

const newClassStatisticSchema = z.object({
  kind: z.literal('new'),
  componentId: z.uuid(),
  ...baseStatisticSchema,
});

const existingClassStatisticSchema = z.object({
  kind: z.literal('existing'),
  id: z.uuid(),
  ...baseStatisticSchema,
});

export const updateClassStatisticFromSchoolSchema = z.discriminatedUnion('kind', [
  newClassStatisticSchema,
  existingClassStatisticSchema,
]);

export type UpdateClassStatisticFromHighSchool = z.infer<typeof updateClassStatisticFromSchoolSchema>;
