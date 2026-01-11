import {
  middleSchoolcolumnFiltersKeys,
  middleSchoolDefaultQuery,
  middleSchoolQueryParamsSchema,
  middleSchoolSortableColumnKeys,
  type MiddleSchoolPageQuery,
  type MiddleSchoolTableRowKeys,
  type MiddleSchoolTableRowType,
  type RequiredMiddleSchoolTableQueryParams,
} from '@contracts/schemas/middleSchool/MiddleSchoolPageQuery';

export type TableRowType = MiddleSchoolTableRowType;
// export type NestedObject = Prettify<NonNullable<TableRowType['profile']>>;
export type TableRowKeys = MiddleSchoolTableRowKeys;

export const columnFiltersKeys: Set<TableRowKeys> = middleSchoolcolumnFiltersKeys;

export const sortableColumnKeys: TableRowKeys[] = middleSchoolSortableColumnKeys;

export const queryParamsSchema = middleSchoolQueryParamsSchema;

export type TableQueryParams = MiddleSchoolPageQuery;

export type RequiredTableQueryParams = RequiredMiddleSchoolTableQueryParams;

export const defaultQuery: RequiredTableQueryParams = middleSchoolDefaultQuery;
