import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Props {
  query: string;
  onSearch: (value: string) => void;
}

export function ContactsToolbar({ query, onSearch }: Props) {
  const [localQuery, setLocalQuery] = useState(query);

  // Debounce search, wait 400ms after user stops typing before firing
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(localQuery);
    }, 400);
    return () => clearTimeout(timeout);
  }, [localQuery]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          className="h-12 rounded-2xl pl-11"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
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
