import apiRoutes from '@/Api/routes/routes';
import { useMajorsStore } from '@/store/use-majors';
import { useRegionStore } from '@/store/use-regions';
import axiosInstance from '@/utils/axios';
import type { MajorResponse } from '@contracts/schemas/major/majorResponse';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useMajors() {
  const query = useQuery({
    queryKey: ['majors'],
    queryFn: async () => {
      const response = await axiosInstance.get<MajorResponse[]>(apiRoutes.majors.getAll());
      return response.data;
    },
    staleTime: Infinity,
  });
  const data = query.data;

  const setMajors = useMajorsStore((state) => state.setMajors);

  useEffect(() => {
    if (data) {
      setMajors(data);
    }
  }, [data, setMajors]);

  return query;
}
