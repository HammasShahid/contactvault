import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import type { ContactFormValues } from '@/lib/schemas/contactSchemas';

interface Props {
  fields: FieldArrayWithId<ContactFormValues, 'phones'>[];
  register: UseFormRegister<ContactFormValues>;
  errors: FieldErrors<ContactFormValues>['phones'];
  append: () => void;
  remove: (index: number) => void;
}

export function PhoneFields({
  fields,
  register,
  errors,
  append,
  remove,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="ml-2 font-semibold">Phone Numbers</h3>
        <Button type="button" variant="outline" size="sm" onClick={append}>
          <Plus className="mr-2 h-4 w-4" />
          Add Phone
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-3 rounded-2xl border p-4">
          <input
            type="hidden"
            {...register(`phones.${index}.id`, { valueAsNumber: true })}
          />
          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              {...register(`phones.${index}.label`)}
              className="rounded-xl"
            />
            {errors?.[index]?.label && (
              <p className="text-sm text-destructive">
                {errors[index]?.label?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              {...register(`phones.${index}.phoneNumber`)}
              className="rounded-xl"
            />
            {errors?.[index]?.phoneNumber && (
              <p className="text-sm text-destructive">
                {errors[index]?.phoneNumber?.message}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
