import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { RegionResponse } from '@contracts/schemas/regions/regionResponse';

const DnDRow = ({ region, index }: { region: RegionResponse; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: region.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className=" flex space-x-2" dir="rtl">
        <span>{index + 1} :</span>
        <span>{region.name}</span>
      </div>
    </div>
  );
};

export default DnDRow;
