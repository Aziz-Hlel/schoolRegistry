import { SelectedRowProvider } from '@/components/Regions/Regions.context';
import RegionsIndex from '@/components/Regions/Regions.index';

const Regions = () => (
  <SelectedRowProvider>
    <RegionsIndex />
  </SelectedRowProvider>
);

export default Regions;
