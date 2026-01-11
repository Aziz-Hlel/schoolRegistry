import { useQuery } from '@tanstack/react-query';
import type { TableRowType } from './tableDeclarations/typesAndFieldsDeclaration';
import useQueryParams from './use-query-params';
import type { Pageable } from '@contracts/types/page/Pageable';
import { apiService } from '@/Api/apiService';
import apiRoutes from '@/Api/routes/routes';
import type { Page } from '@contracts/types/page/Page';

const blankPagination: Pageable = {
  size: 0,
  number: 0,
  totalElements: 0,
  totalPages: 0,
  offset: 0,
  pageSize: 0,
};

const useGetTableData = () => {
  const { queryParams } = useQueryParams();
  const adjustedQueryParams = {
    ...queryParams,
    page: queryParams.page,
    isPublic: queryParams.isPublic.join(','),
  };

  const getPage = () =>
    apiService.getThrowable<Page<TableRowType>>(apiRoutes.middleSchools.getPage(), { params: adjustedQueryParams });

  const { data, isFetching } = useQuery({
    queryKey: ['middleSchools', { ...queryParams }],
    queryFn: getPage,
    placeholderData: (previousData) => previousData,
  });

  const tableData: TableRowType[] = data?.content ?? [];
  console.log('tableData', tableData);
  const pagination = data?.pagination ?? blankPagination;

  return { tableData, pagination, isLoading: isFetching };
};

export default useGetTableData;
