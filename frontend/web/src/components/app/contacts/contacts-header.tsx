import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Contacts</h1>

        <p className="mt-2 text-muted-foreground">
          Manage all your contacts from one place.
        </p>
      </div>

      <Button size="lg" className="rounded-2xl shadow-lg shadow-primary/20">
        <Plus className="mr-2 h-4 w-4" />
        Add Contact
      </Button>
    </div>
  );
}
