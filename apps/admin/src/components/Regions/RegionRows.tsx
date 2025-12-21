import { useRegionStore } from '@/store/use-regions';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import { useSelectedRow } from './Regions.context';
import type { RegionResponse } from '@contracts/schemas/regions/regionResponse';

const RegionsMain = () => {
  const regions = useRegionStore((state) => state.regions);

  const { setCurrentRow, setOpenDialog } = useSelectedRow();

  const handleDeleteClick = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId) || null;
    setCurrentRow(region);
    setOpenDialog('delete');
  };

  const handleEditClick = (region: RegionResponse) => {
    setCurrentRow(region);
    setOpenDialog('edit');
  };
  return (
    <div>
      {regions.map((region) => (
        <Card className=" m-8 w-96 py-4">
          <CardContent className=" flex  justify-between items-center">
            <div key={region.id}>{region.name}</div>

            <div className=" space-x-2">
              <Button variant="destructive" className="rounded-full " onClick={() => handleDeleteClick(region.id)}>
                <Trash2 className="size-3 rounded-full " />
              </Button>
              <Button className="rounded-full " onClick={() => handleEditClick(region)}>
                <SquarePen className="size-3 rounded-full " />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RegionsMain;
