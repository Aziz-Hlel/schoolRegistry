import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { MajorResponse } from '@contracts/schemas/major/majorResponse';

const DnDRow = ({ major, index }: { major: MajorResponse; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: major.id });

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
        <span>{major.name}</span>
      </div>
    </div>
  );
};

export default DnDRow;
