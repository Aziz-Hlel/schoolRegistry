import { SelectedRegionRowProvider } from '@/components/Regions/Regions.context';
import RegionsIndex from '@/components/Regions/Regions.index';

const Regions = () => (
  <SelectedRegionRowProvider>
    <RegionsIndex />
  </SelectedRegionRowProvider>
);

export default Regions;
