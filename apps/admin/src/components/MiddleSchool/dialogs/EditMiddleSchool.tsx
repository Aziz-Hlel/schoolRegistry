import { useSelectedRow } from '../context/selected-row-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@/components/ui/separator';
import {
  updateMiddleSchoolRequestSchema,
  type UpdateMiddleSchoolRequest,
} from '@contracts/schemas/middleSchool/updateMiddleSchoolRequest';
import { apiService } from '@/Api/apiService';
import apiRoutes from '@/Api/routes/routes';
import { useRegionStore } from '@/store/use-regions';
import InputNumberForm from '@/components/ui2/InputNumberForm';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import SelectForm from '@/components/ui2/SelectForm/SelectForm';
import { cn } from '@/lib/utils';

const EditMiddleSchool = () => {
  const { handleCancel, openDialog, currentRow } = useSelectedRow();
  if (!currentRow) throw new Error('No current row selected');
  const queryClient = useQueryClient();
  const school = currentRow;

  const updateMiddleSchool = async ({
    middleSchoolId,
    data,
  }: {
    middleSchoolId: string;
    data: UpdateMiddleSchoolRequest;
  }) => apiService.putThrowable(apiRoutes.middleSchools.update(middleSchoolId), data);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['middleSchools', 'update'],
    mutationFn: updateMiddleSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['middleSchools'], exact: false });
      form.reset();
      handleCancel();
    },
  });

  const defaultValues: UpdateMiddleSchoolRequest = {
    name: school.name,
    isPublic: school.isPublic,
    staffCount: school.staffCount,
    regionId: school.region?.id ?? '',
    director: school.director
      ? {
          name: school.director.name,
          email: school.director.email,
          phone: school.director.phone,
        }
      : null,
  };

  const regions = useRegionStore((state) => state.regions);

  const regionSelectOptions: Record<string, string> = regions.reduce(
    (acc, region) => {
      acc[region.id] = region.name;
      return acc;
    },
    {} as Record<string, string>,
  );
  const form = useForm<UpdateMiddleSchoolRequest>({
    resolver: zodResolver(updateMiddleSchoolRequestSchema),
    defaultValues: defaultValues,
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      handleCancel();
    }
  };

  const onSubmit: SubmitHandler<UpdateMiddleSchoolRequest> = async (data) => {
    try {
      await mutateAsync({ middleSchoolId: school.id, data });
      toast.success('Middle school updated successfully');
    } catch (error) {
      console.log(error);

      toast.error('Failed to update middle school');
    }
  };

  const dialogIsOpen = openDialog === 'edit';

  console.log('form :', form.getValues());
  console.log('erros : ', form.formState.errors);
  return (
    <Dialog onOpenChange={onOpenChange} open={dialogIsOpen}>
      <DialogContent className="sm:max-w-106.25 h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full ">
          <DialogHeader>
            <DialogTitle>Edit Middle School</DialogTitle>
            <DialogDescription>Fill the form below to edit the middle school.</DialogDescription>
          </DialogHeader>
          <div className=" flex-1 overflow-y-auto pr-2">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`name-input`}>Name</FieldLabel>
                    <Input {...field} id={`name-input`} aria-invalid={fieldState.invalid} placeholder="Name" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="staffCount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`staffCount-input`}>Staff Count</FieldLabel>
                    <InputNumberForm field={field} placeholder="Staff Count" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="isPublic"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label className="p-4 space-x-2 cursor-pointer  flex items-start rounded-lg border has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      <div className="flex flex-col space-y-2 leading-none  ">
                        <h2>Is Public</h2>
                        <p className=" text-muted-foreground">
                          Indicates whether the middle school is a public institution.
                        </p>
                      </div>
                    </Label>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="regionId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`regionId-input`}>Region</FieldLabel>
                    <SelectForm
                      field={field}
                      label="Region"
                      options={regionSelectOptions}
                      placeholder="Select region"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Separator />
              <Controller
                name="director"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="p-4 space-x-2  flex items-start rounded-lg border border-black border-dashed has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                      <div className="flex flex-col space-y-8  ">
                        <Label
                          htmlFor="director-checkbox"
                          className="flex flex-col space-y-2 leading-none cursor-pointer"
                        >
                          <div className="space-x-2">
                            <Checkbox
                              id="director-checkbox"
                              checked={field.value !== null}
                              onCheckedChange={(checked) => field.onChange(checked ? {} : null)}
                            />
                            <span className=" text-lg text-left">Director</span>
                          </div>
                          <p className=" text-muted-foreground leading-none text-xs">
                            Indicates whether the middle school has an assigned director.
                          </p>
                          <Separator />
                        </Label>
                        <div
                          aria-disabled={field.value === null}
                          className={cn(
                            'flex flex-col space-y-4',
                            field.value === null && 'pointer-events-none opacity-50',
                          )}
                        >
                          <Controller
                            name="director.name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid} className="flex gap-1">
                                <FieldLabel htmlFor={`director-name-input`}>Director Name</FieldLabel>
                                <Input
                                  {...field}
                                  id={`director-name-input`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Director Name"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                              </Field>
                            )}
                          />

                          <Controller
                            name="director.email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid} className="flex gap-1">
                                <FieldLabel htmlFor={`director-email-input`}>Director Email</FieldLabel>
                                <Input
                                  {...field}
                                  id={`director-email-input`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Director Email"
                                  value={field.value ?? ''}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                              </Field>
                            )}
                          />

                          <Controller
                            name="director.phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid} className="flex gap-1">
                                <FieldLabel htmlFor={`director-phone-input`}>Director Phone</FieldLabel>
                                <Input
                                  {...field}
                                  id={`director-phone-input`}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Director Phone"
                                  value={field.value ?? ''}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                              </Field>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className=" w-40" disabled={isPending}>
              {isPending ? <Spinner /> : <span>Update Middle School</span>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMiddleSchool;
