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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="lg" className="rounded-2xl">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Add Contact</SheetTitle>

          <SheetDescription>
            Create a new contact with emails and phone numbers.
          </SheetDescription>
        </SheetHeader>

        <ContactForm />
      </SheetContent>
    </Sheet>
  );
}
