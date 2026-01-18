import { isPublicTextMapping } from '@/EnumTextMapping/isPublicTextMapping';
import type { TableRowType } from '../../tableDeclarations/typesAndFieldsDeclaration';

export type ColumnFilter<T extends keyof TableRowType> = {
  columnId: T;
  title: string;
  options: {
    label: string;
    value: TableRowType[T];
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

const statusFilterData: ColumnFilter<'isPublic'> = {
  columnId: 'isPublic',
  title: 'نوع المدرسة',
  options: Object.keys(isPublicTextMapping).map((key) => ({
    label: isPublicTextMapping[key as keyof typeof isPublicTextMapping],
    value: key === 'true',
  })),
};

const tableFilters = [statusFilterData];

export default tableFilters;
