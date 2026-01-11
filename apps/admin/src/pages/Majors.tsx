import { SelectedMajorRowProvider } from '@/components/Majors/Majors.context';
import MajorsIndex from '@/components/Majors/Majors.index';

const Majors = () => {
  return (
    <SelectedMajorRowProvider>
      <MajorsIndex />
    </SelectedMajorRowProvider>
  );
};

export default Majors;
