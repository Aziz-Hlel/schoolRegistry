import { SchoolType } from '../../types/enums/enums';
import { DirectorResponse } from '../director/DirectorResponse';
import { RegionResponse } from '../regions/regionResponse';

export type SchoolResponse = {
  id: string;
  name: string;
  region: RegionResponse | null;
  director: DirectorResponse | null;
  staffCount: number | null;
  type: SchoolType;
  createdAt: string;
  updatedAt: string;
};
