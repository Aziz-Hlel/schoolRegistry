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
import { Spinner } from '@/components/ui/spinner';
import { useSelectedRow } from '../Electives.context';
import {
  createElectiveRequestSchema,
  type CreateElectiveRequest,
} from '@contracts/schemas/elective/createElectiveRequest';

const CreateDialog = () => {
  const { handleCancel, openDialog } = useSelectedRow();
  const queryClient = useQueryClient();

  const form = useForm<CreateElectiveRequest>({
    resolver: zodResolver(createElectiveRequestSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateElectiveRequest) => {
      const repsonse = await axiosInstance.post(apiRoutes.electives.create(), data);
      return repsonse.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['electives'], exact: false });
      toast.success('Elective created successfully.');
      handleCancel();
    },
    onError: () => {
      toast.error('Failed to create elective. Please try again.');
    },
  });

  const onSubmit = async (data: CreateElectiveRequest) => {
    await mutateAsync(data);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={openDialog === 'add'}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Create Region</DialogTitle>
            <DialogDescription>Fill the form below to create a new region.</DialogDescription>
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

export default CreateDialog;
