import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PhoneFields({ fields, register, append, remove }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold ml-2">Phone Numbers</h3>

        <Button type="button" variant="outline" size="sm" onClick={append}>
          <Plus className="mr-2 h-4 w-4" />
          Add Phone
        </Button>
      </div>

      {fields.map((field: any, index: number) => (
        <div key={field.id} className="rounded-2xl border p-4 space-y-3">
          <div className="space-y-2">
            <Label>Label</Label>

            <Input {...register(`phones.${index}.label`)} />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>

            <Input {...register(`phones.${index}.phoneNumber`)} />
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
