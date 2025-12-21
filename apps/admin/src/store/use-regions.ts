import type { RegionResponse } from '@contracts/schemas/regions/regionResponse';
import { create } from 'zustand';

type RegionState = {
  regions: RegionResponse[];
  regionMap: Map<string, RegionResponse>;
  selectedRegionId: string | null;
  setRegions: (regions: RegionResponse[]) => void;
  setSelectedRegion: (id: string | null) => void;
};

export const useRegionStore = create<RegionState>((set) => ({
  regions: [],
  regionMap: new Map(),
  selectedRegionId: null,

  setRegions: (regions) =>
    set({
      regions,
      regionMap: new Map(regions.map((r) => [r.id, r])),
    }),

  setSelectedRegion: (id) => set({ selectedRegionId: id }),
}));
