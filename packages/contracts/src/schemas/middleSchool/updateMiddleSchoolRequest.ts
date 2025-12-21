import z from 'zod';
import { createMiddleSchoolRequestSchema } from './createMiddleSchoolRequest';

export const updateMiddleSchoolRequestSchema = createMiddleSchoolRequestSchema;
export type UpdateMiddleSchoolRequest = z.infer<typeof updateMiddleSchoolRequestSchema>;
