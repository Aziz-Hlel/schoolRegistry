import { useSelectedRow } from '../Regions.context';
import {
  AlertDialog,
  AlertDialogAction,
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

const DeleteRegion = () => {
  const { currentRow, setCurrentRow, openDialog, setOpenDialog } = useSelectedRow();
  const region = currentRow!;
  const query = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-region'],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(apiRoutes.regions.delete(id));
      return response.data;
    },
    onSuccess: () => {
      // Invalidate or refetch queries if needed
      setCurrentRow(null);
      setOpenDialog(null);
      query.invalidateQueries({ queryKey: ['regions'] });
      toast.success('Region deleted successfully.');
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
      await mutateAsync(region.id);
    } catch (error) {
      toast.error('Failed to delete region. Please try again.');
    }
  };
  return (
    <AlertDialog open={openDialog === 'delete'} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className=" flex items-start justify-start text-start w-full ">
          <AlertDialogTitle className=" flex items-start justify-start text-start w-full">
            هل أنت متأكد تماماً؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف المنطقة بشكل دائم وإزالة جميع بيانتها.
            <p className=" font-semibold">* لن يتم حذف المعتمدية إذا كانت هناك مدرسة مرتبطة بها.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            className=" bg-red-600 hover:bg-red-700 focus:ring-red-700 "
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <span>متابعة</span>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRegion;
