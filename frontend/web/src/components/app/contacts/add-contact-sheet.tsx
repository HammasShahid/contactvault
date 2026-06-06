import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ContactForm } from './contact-form';

export function AddContactSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="rounded-2xl shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-2xl"
      >
        <SheetHeader>
          <SheetTitle>Add Contact</SheetTitle>
          <SheetDescription>
            Create a new contact with emails and phone numbers.
          </SheetDescription>
        </SheetHeader>
        <ContactForm onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
