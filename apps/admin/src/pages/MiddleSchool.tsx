import { SelectedRowProvider } from '@/components/MiddleSchool/context/selected-row-provider';
import MiddleSchoolIndex from '@/components/MiddleSchool/MiddleSchool.index';

const MiddleSchool = () => (
  <SelectedRowProvider>
    <MiddleSchoolIndex />
  </SelectedRowProvider>
);

export default MiddleSchool;
