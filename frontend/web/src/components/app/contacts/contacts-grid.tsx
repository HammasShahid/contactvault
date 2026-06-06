import type { ContactResponse } from '#/types';
import { ContactCard } from './contacts-card';

const contacts = [
  {
    id: 1,
    firstName: 'Babar',
    lastName: 'Azam',
    title: 'Software Engineer',
    email: 'babar@xyz.com',
    phone: '03123456789',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    title: 'Designer',
    email: 'john@xyz.com',
    phone: '03001234567',
  },
  {
    id: 3,
    firstName: 'Sarah',
    lastName: 'Khan',
    title: 'Marketing Lead',
    email: 'sarah@xyz.com',
    phone: '03225556666',
  },
];

interface ContactsGridProps {
  contacts: ContactResponse[];
  isLoading: boolean;
  isError: boolean;
}

export function ContactsGrid({
  contacts,
  isLoading,
  isError,
}: ContactsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
