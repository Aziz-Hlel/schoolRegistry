import { SelectedElectiveRowProvider } from '@/components/Electives/Electives.context';
import ElectivesIndex from '@/components/Electives/Electives.index';

const Electives = () => {
  return (
    <SelectedElectiveRowProvider>
      <ElectivesIndex />
    </SelectedElectiveRowProvider>
  );
};

export default Electives;
