import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { useSelectedRow } from './Electives.context';
import { useElectivesStore } from '@/store/use-electives';
import type { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';

const ElectivesMain = () => {
  const electives = useElectivesStore((state) => state.electives);
  const { setCurrentRow, setOpenDialog } = useSelectedRow();

  const handleDeleteClick = (electiveId: string) => {
    const elective = electives.find((e) => e.id === electiveId) || null;
    setCurrentRow(elective);
    setOpenDialog('delete');
  };

  const handleEditClick = (elective: ElectiveResponse) => {
    setCurrentRow(elective);
    setOpenDialog('edit');
  };
  return (
    <div>
      {electives.map((elective) => (
        <Card className=" m-8 w-96 py-4" key={elective.id}>
          <CardContent className=" flex justify-between items-center">
            <div key={elective.id}>{elective.name}</div>

            <div className=" space-x-2">
              <Button variant="destructive" className="rounded-full " onClick={() => handleDeleteClick(elective.id)}>
                <Trash2 className="size-3 rounded-full " />
              </Button>
              <Button className="rounded-full " onClick={() => handleEditClick(elective)}>
                <SquarePen className="size-3 rounded-full " />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ElectivesMain;
