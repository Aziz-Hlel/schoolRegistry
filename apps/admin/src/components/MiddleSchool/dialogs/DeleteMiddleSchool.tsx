import { useSelectedRow } from '../context/selected-row-provider';
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
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { apiService } from '@/Api/apiService';
import apiRoutes from '@/Api/routes/routes';

const DeleteMiddleSchool = () => {
  const { handleCancel, openDialog, currentRow } = useSelectedRow();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ['middleSchools', 'delete'],
    mutationFn: (middleSchoolId: string) => apiService.deleteThrowable(apiRoutes.middleSchools.delete(middleSchoolId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['middleSchools'], exact: false });
      toast.success('Middle school deleted successfully');
      handleCancel();
    },
  });

  const deleteMiddleSchool = async () => {
    try {
      await mutateAsync(currentRow?.id!);
    } catch (error) {
      toast.error('Failed to delete middle school. Please try again.');
      handleCancel();
    }
  };
  const dialogOpen = openDialog === 'delete';
  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={handleCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيؤدي ذلك إلى حذف المدرسة المتوسطة
              <strong>{currentRow?.name}</strong>
              بشكل دائم وإزالة بياناتها من خوادمنا.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>إلغاء</AlertDialogCancel>
            <Button onClick={deleteMiddleSchool} className=" bg-red-600 hover:bg-red-500">
              حذف
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteMiddleSchool;
