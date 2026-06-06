import { ContactsGrid } from '#/components/app/contacts/contacts-grid';
import { ContactsHeader } from '#/components/app/contacts/contacts-header';
import { ContactsPagination } from '#/components/app/contacts/contacts-pagination';
import { ContactsToolbar } from '#/components/app/contacts/contacts-toolbar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contacts')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <ContactsHeader />

      <ContactsToolbar />

      <ContactsGrid />

      <ContactsPagination />
    </div>
  );
}
