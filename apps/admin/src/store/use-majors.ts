import type { MajorResponse } from '@contracts/schemas/major/majorResponse';
import { create } from 'zustand';

type MajorState = {
  majors: MajorResponse[];
  majorMap: Map<string, MajorResponse>;
  selectedMajorId: string | null;
  setMajors: (majors: MajorResponse[]) => void;
  setSelectedMajor: (id: string | null) => void;
};

export const useMajorsStore = create<MajorState>((set) => ({
  majors: [],
  majorMap: new Map(),
  selectedMajorId: null,

  setMajors: (majors) =>
    set({
      majors,
      majorMap: new Map(majors.map((m) => [m.id, m])),
    }),

  setSelectedMajor: (id) => set({ selectedMajorId: id }),
}));
