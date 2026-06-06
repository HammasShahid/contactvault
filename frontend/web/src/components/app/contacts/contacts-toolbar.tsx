import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ContactsToolbar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search contacts..."
          className="h-12 rounded-2xl pl-11"
        />
      </div>

      <Button variant="outline" className="h-12 rounded-2xl">
        Filter
      </Button>

      <Button variant="outline" className="h-12 rounded-2xl">
        Sort
      </Button>
    </div>
  );
}
