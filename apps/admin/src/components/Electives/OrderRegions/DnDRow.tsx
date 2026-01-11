import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { MajorResponse } from '@contracts/schemas/major/majorResponse';
import type { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';

const DnDRow = ({ elective, index }: { elective: ElectiveResponse; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: elective.id });

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
        <span>{elective.name}</span>
      </div>
    </div>
  );
};

export default DnDRow;
