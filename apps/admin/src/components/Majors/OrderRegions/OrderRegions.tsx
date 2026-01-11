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
import { useSelectedRow } from '../Majors.context';
import { useMajorsStore } from '@/store/use-majors';

const OrderRegions = () => {
  const majors = useMajorsStore((state) => state.majors);
  const { handleCancel, openDialog } = useSelectedRow();
  const queryClient = useQueryClient();

  const [sortableMajors, setSortableMajors] = useState(majors);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newOrder: string[]) => {
      await apiService.postThrowable(apiRoutes.majors.order(), { majors: newOrder });
    },

    onSuccess: () => {
      toast.success('Major order saved successfully.');
      queryClient.invalidateQueries({ queryKey: ['majors'], exact: false });
      handleCancel();
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSortableMajors((prev) => {
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
    const newOrder = sortableMajors.map((r) => r.id);
    try {
      await mutateAsync(newOrder);
    } catch (error) {
      toast.error('Failed to save region order. Please try again.');
    }
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog === 'order'}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Order Majors</DialogTitle>
          <DialogDescription>Drag and drop to reorder the majors.</DialogDescription>
        </DialogHeader>
        <div className=" overflow-y-hidden">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sortableMajors.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              {sortableMajors.map((item, index) => (
                <DnDRow key={item.id} major={item} index={index} />
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
