import { ContactCard } from './contacts-card';
import type { ContactResponse } from '@/types';

interface Props {
  contacts: ContactResponse[];
  isLoading: boolean;
  isError: boolean;
}

export function ContactsGrid({ contacts, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-[2rem] bg-muted" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-48 items-center justify-center rounded-[2rem] border border-border">
        <p className="text-muted-foreground">Failed to load contacts.</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-[2rem] border border-dashed border-border">
        <p className="text-muted-foreground">No contacts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
