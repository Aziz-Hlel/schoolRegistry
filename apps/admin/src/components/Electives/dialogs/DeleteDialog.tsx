import { useSelectedRow } from '../Electives.context';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import apiRoutes from '@/Api/routes/routes';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

const DeleteDialog = () => {
  const { currentRow, setCurrentRow, openDialog, setOpenDialog } = useSelectedRow();
  const elective = currentRow!;
  const query = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-elective', elective.id],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(apiRoutes.electives.delete(id));
      return response.data;
    },
    onSuccess: () => {
      // Invalidate or refetch queries if needed
      setCurrentRow(null);
      setOpenDialog(null);
      query.invalidateQueries({ queryKey: ['electives'] });
      toast.success('Elective deleted successfully.');
    },
  });

  const handleCancel = () => {
    setCurrentRow(null);
    setOpenDialog(null);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  const handleDelete = async () => {
    try {
      await mutateAsync(elective.id);
    } catch (error) {
      toast.error('Failed to delete elective. Please try again.');
    }
  };
  return (
    <AlertDialog open={openDialog === 'delete'} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className=" flex items-start justify-start text-start w-full ">
          <AlertDialogTitle className="  text-right w-full">هل أنت متأكد تماماً؟</AlertDialogTitle>
          <AlertDialogDescription className=" text-right w-full">
            لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف الشعبة بشكل دائم وإزالة جميع بيانتها.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className=" w-full flex justify-start gap-2">
            <AlertDialogCancel onClick={handleCancel}>إلغاء</AlertDialogCancel>
            <Button
              className=" bg-red-600 hover:bg-red-700 focus:ring-red-700  "
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : <span>حذف</span>}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
