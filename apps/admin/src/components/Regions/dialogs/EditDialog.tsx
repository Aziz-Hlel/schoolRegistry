import apiRoutes from '@/Api/routes/routes';
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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSelectedRow } from '../Regions.context';
import { Spinner } from '@/components/ui/spinner';
import { updateRegionRequestSchema, type UpdateRegionRequest } from '@contracts/schemas/regions/updateRegionRequest';

const EditDialog = () => {
  const { handleCancel, currentRow, openDialog } = useSelectedRow();
  const queryClient = useQueryClient();

  const form = useForm<UpdateRegionRequest>({
    resolver: zodResolver(updateRegionRequestSchema),
    defaultValues: {
      name: currentRow?.name || '',
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UpdateRegionRequest) => {
      const repsonse = await axiosInstance.put(apiRoutes.regions.update(currentRow?.id ?? ''), data);
      return repsonse.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'], exact: false });
      toast.success('Region updated successfully.');
      handleCancel();
    },
    onError: () => {
      toast.error('Failed to create region. Please try again.');
    },
  });

  const onSubmit = async (data: UpdateRegionRequest) => {
    await mutateAsync(data);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  console.log('erors : ', form.formState.errors);
  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog === 'edit'}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Update Region</DialogTitle>
            <DialogDescription>Fill the form below to update the region.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`name-input`}>Name</FieldLabel>
                  <Input {...field} id={`name-input`} aria-invalid={fieldState.invalid} placeholder="Region name" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{isPending ? <Spinner /> : <span>Save changes</span>}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
