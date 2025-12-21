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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/utils/axios';
import { createRegionRequestSchema, type CreateRegionRequest } from '@contracts/schemas/regions/createRegionRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSelectedRow } from '../Regions.context';
import { Spinner } from '@/components/ui/spinner';

const CreateDialog = () => {
  const { handleCancel } = useSelectedRow();
  const queryClient = useQueryClient();

  const form = useForm<CreateRegionRequest>({
    resolver: zodResolver(createRegionRequestSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateRegionRequest) => {
      const repsonse = await axiosInstance.post(apiRoutes.regions.create(), data);
      return repsonse.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'], exact: false });
      toast.success('Region created successfully.');
      handleCancel();
    },
    onError: () => {
      toast.error('Failed to create region. Please try again.');
    },
  });

  const onSubmit = async (data: CreateRegionRequest) => {
    console.log('t5l');
    await mutateAsync(data);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  console.log('erors : ', form.formState.errors);
  return (
    <Dialog onOpenChange={onOpenChange} open={true}>
      <DialogContent className="sm:max-w-[425px]">
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
