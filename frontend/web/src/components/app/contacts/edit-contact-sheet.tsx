import { useState } from 'react';
import { Edit } from 'lucide-react';
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
import type { ContactResponse } from '@/types';

interface Props {
  contact: ContactResponse;
}

export function EditContactSheet({ contact }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="flex-1 rounded-2xl" size="lg">
          <Edit className="mr-2 h-4 w-4" />
          Edit Contact
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-2xl"
      >
        <SheetHeader>
          <SheetTitle>Edit Contact</SheetTitle>
          <SheetDescription>
            Update contact details, emails, and phone numbers.
          </SheetDescription>
        </SheetHeader>
        <ContactForm contact={contact} onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
