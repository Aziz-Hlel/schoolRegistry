// hooks/useRegions.ts
import apiRoutes from '@/Api/routes/routes';
import { useRegionStore } from '@/store/use-regions';
import axiosInstance from '@/utils/axios';
import type { RegionResponse } from '@contracts/schemas/regions/regionResponse';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useRegions() {
  const query = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const response = await axiosInstance.get<RegionResponse[]>(apiRoutes.regions.getAll());
      return response.data;
    },
    staleTime: Infinity,
  });
  const data = query.data;

  const setRegions = useRegionStore((state) => state.setRegions);

  useEffect(() => {
    if (data) {
      setRegions(data);
    }
  }, [data, setRegions]);

  return query;
}
