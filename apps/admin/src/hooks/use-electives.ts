import apiRoutes from '@/Api/routes/routes';
import { useElectivesStore } from '@/store/use-electives';
import axiosInstance from '@/utils/axios';
import type { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useElectives() {
  const query = useQuery({
    queryKey: ['electives'],
    queryFn: async () => {
      const response = await axiosInstance.get<ElectiveResponse[]>(apiRoutes.electives.getAll());
      return response.data;
    },
    staleTime: Infinity,
  });
  const data = query.data;

  const setElectives = useElectivesStore((state) => state.setElectives);

  useEffect(() => {
    if (data) {
      setElectives(data);
    }
  }, [data, setElectives]);

  return query;
}
