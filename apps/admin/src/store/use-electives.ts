import type { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';
import { create } from 'zustand';

type ElectiveState = {
  electives: ElectiveResponse[];
  electiveMap: Map<string, ElectiveResponse>;
  selectedElectiveId: string | null;
  setElectives: (electives: ElectiveResponse[]) => void;
  setSelectedElective: (id: string | null) => void;
};

export const useElectivesStore = create<ElectiveState>((set) => ({
  electives: [],
  electiveMap: new Map(),
  selectedElectiveId: null,

  setElectives: (electives) =>
    set({
      electives,
      electiveMap: new Map(electives.map((e) => [e.id, e])),
    }),

  setSelectedElective: (id) => set({ selectedElectiveId: id }),
}));
