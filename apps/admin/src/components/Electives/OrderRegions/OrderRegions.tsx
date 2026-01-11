import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import DnDRow from './DnDRow';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/Api/apiService';
import apiRoutes from '@/Api/routes/routes';
import { toast } from 'sonner';
import { useSelectedRow } from '../Electives.context';
import { useMajorsStore } from '@/store/use-majors';
import { useElectivesStore } from '@/store/use-electives';

const OrderRegions = () => {
  const electives = useElectivesStore((state) => state.electives);
  const { handleCancel, openDialog } = useSelectedRow();
  const queryClient = useQueryClient();

  const [sortableElectives, setSortableElectives] = useState(electives);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newOrder: string[]) => {
      await apiService.postThrowable(apiRoutes.electives.order(), { electives: newOrder });
    },

    onSuccess: () => {
      toast.success('Elective order saved successfully.');
      queryClient.invalidateQueries({ queryKey: ['electives'], exact: false });
      handleCancel();
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSortableElectives((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return prev;

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  const handleSave = async () => {
    const newOrder = sortableElectives.map((r) => r.id);
    try {
      await mutateAsync(newOrder);
    } catch (error) {
      toast.error('Failed to save elective order. Please try again.');
    }
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog === 'order'}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Order Electives</DialogTitle>
          <DialogDescription>Drag and drop to reorder the electives.</DialogDescription>
        </DialogHeader>
        <div className=" overflow-y-hidden">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sortableElectives.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              {sortableElectives.map((item, index) => (
                <DnDRow key={item.id} elective={item} index={index} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSave} className=" w-28">
            {isPending ? <Spinner /> : <span>Save changes</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderRegions;
