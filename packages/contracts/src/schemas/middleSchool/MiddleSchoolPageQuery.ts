import z from 'zod';
import { MiddleSchoolRowResponse } from './middleSchoolRowResponse';

export type MiddleSchoolTableRowType = MiddleSchoolRowResponse;
// export type NestedObject = Prettify<NonNullable<TableRowType['profile']>>;
export type MiddleSchoolTableRowKeys = keyof MiddleSchoolTableRowType;

export const middleSchoolcolumnFiltersKeys: Set<MiddleSchoolTableRowKeys> = new Set(['isPublic', 'region'] as const);

export const middleSchoolPageQuerySortFields: Set<MiddleSchoolTableRowKeys> = new Set(['isPublic', 'region']);

export const middleSchoolSortableColumnKeys: MiddleSchoolTableRowKeys[] = [
  'name',
  'director',
  'isPublic',
  'region',
  'createdAt',
  'updatedAt',
  'staffCount',
] as const;

const csvEnumArray = <T extends string[]>(values: T) =>
  z
    .string()
    .transform((value) =>
      value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .sort(),
    )
    .pipe(z.array(z.enum(values)));

const csvBooleanArray = <T extends boolean[]>(values: T) =>
  z
    .string()
    .transform((value) =>
      value
        .split(',')
        .map((v) => v.trim().toLowerCase() === 'true')
        .filter(Boolean)
        .sort(),
    )
    .pipe(z.array(z.boolean()));

export const middleSchoolQueryParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  size: z.coerce.number().int().min(5).max(50).catch(10),
  sort: z.enum(middleSchoolSortableColumnKeys).catch('createdAt'),
  order: z.enum(['asc', 'desc']).catch('desc'),
  search: z.string().trim().catch(''),
  // Filters
  isPublic: csvBooleanArray([true, false]).catch([]),
});
export type MiddleSchoolTableQueryParams = z.infer<typeof middleSchoolQueryParamsSchema>;
export type RequiredMiddleSchoolTableQueryParams = MiddleSchoolTableQueryParams;

export const middleSchoolDefaultQuery: RequiredMiddleSchoolTableQueryParams = {
  page: 1,
  size: 10,
  sort: 'createdAt',
  order: 'desc',
  search: '',
  isPublic: [],
};

export type MiddleSchoolPageQuery = z.infer<typeof middleSchoolQueryParamsSchema>;
