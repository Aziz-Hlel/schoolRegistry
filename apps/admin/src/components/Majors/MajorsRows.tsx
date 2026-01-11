import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { useSelectedRow } from './Majors.context';
import type { MajorResponse } from '@contracts/schemas/major/majorResponse';
import { useMajorsStore } from '@/store/use-majors';

const MajorsMain = () => {
  const majors = useMajorsStore((state) => state.majors);
  const { setCurrentRow, setOpenDialog } = useSelectedRow();

  const handleDeleteClick = (majorId: string) => {
    const major = majors.find((m) => m.id === majorId) || null;
    setCurrentRow(major);
    setOpenDialog('delete');
  };

  const handleEditClick = (major: MajorResponse) => {
    setCurrentRow(major);
    setOpenDialog('edit');
  };
  return (
    <div>
      {majors.map((major) => (
        <Card className=" m-8 w-96 py-4" key={major.id}>
          <CardContent className=" flex justify-between items-center">
            <div key={major.id}>{major.name}</div>

            <div className=" space-x-2">
              <Button variant="destructive" className="rounded-full " onClick={() => handleDeleteClick(major.id)}>
                <Trash2 className="size-3 rounded-full " />
              </Button>
              <Button className="rounded-full " onClick={() => handleEditClick(major)}>
                <SquarePen className="size-3 rounded-full " />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MajorsMain;
