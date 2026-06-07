import { ContactActions } from '#/components/app/contacts/view/contact-actions';
import { ContactEmailsCard } from '#/components/app/contacts/view/contact-emails-card';
import { ContactPhonesCard } from '#/components/app/contacts/view/contact-phones-card';
import { ContactProfileCard } from '#/components/app/contacts/view/contact-profile-card';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useContact } from '@/hooks/useContact';
import { useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '@/api/contactsApi';
import { queryKeys } from '@/lib/queryKeys';
import { useState } from 'react';

export const Route = createFileRoute('/_protected/contacts/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const contactId = Number(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: contact, isLoading, isError } = useContact(contactId);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      setIsDeleting(true);
      await contactsApi.delete(contactId);
      // Invalidate contacts list so it refreshes after deletion
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.lists() });
      router.navigate({ to: '/contacts' });
    } catch {
      alert('Failed to delete contact. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
        <div className="h-56 animate-pulse rounded-[2rem] bg-muted" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-48 animate-pulse rounded-[2rem] bg-muted" />
          <div className="h-48 animate-pulse rounded-[2rem] bg-muted" />
        </div>
        <div className="h-24 animate-pulse rounded-[2rem] bg-muted" />
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <div className="flex h-48 items-center justify-center rounded-[2rem] border border-border">
          <p className="text-muted-foreground">Contact not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
      <ContactProfileCard contact={contact} />
      <div className="grid gap-6 lg:grid-cols-2">
        <ContactEmailsCard emails={contact.emails} />
        <ContactPhonesCard phones={contact.phones} />
      </div>
      <ContactActions
        contact={contact}
        isDeleting={isDeleting}
        onDelete={handleDelete}
      />
    </div>
  );
}
