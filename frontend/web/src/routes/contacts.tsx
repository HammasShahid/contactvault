import { ContactsGrid } from '#/components/app/contacts/contacts-grid';
import { ContactsHeader } from '#/components/app/contacts/contacts-header';
import { ContactsPagination } from '#/components/app/contacts/contacts-pagination';
import { ContactsToolbar } from '#/components/app/contacts/contacts-toolbar';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useContacts } from '@/hooks/useContacts';

const PAGE_SIZE = 12;

export const Route = createFileRoute('/contacts')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  const { data, isLoading, isError } = useContacts(page, PAGE_SIZE, query);

  const contacts = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(0); // reset to first page on new search
  };

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <ContactsHeader />
      <ContactsToolbar query={query} onSearch={handleSearch} />
      <ContactsGrid
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
      />
      <ContactsPagination
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
