import { ContactActions } from '#/components/app/contacts/view/contact-actions';
import { ContactEmailsCard } from '#/components/app/contacts/view/contact-emails-card';
import { ContactPhonesCard } from '#/components/app/contacts/view/contact-phones-card';
import { ContactProfileCard } from '#/components/app/contacts/view/contact-profile-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contacts/$id')({
  component: RouteComponent,
});

const contact = {
  id: 1,
  firstName: 'Babar',
  lastName: 'Azam',
  title: 'Software Engineer',
  emails: [
    {
      id: 1,
      label: 'Work',
      email: 'babar@company.com',
    },
    {
      id: 2,
      label: 'Personal',
      email: 'babar@gmail.com',
    },
  ],
  phones: [
    {
      id: 1,
      label: 'Mobile',
      phoneNumber: '03123456789',
    },
    {
      id: 2,
      label: 'Home',
      phoneNumber: '03001112222',
    },
  ],
};
function RouteComponent() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-8">
      <ContactProfileCard contact={contact} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ContactEmailsCard emails={contact.emails} />

        <ContactPhonesCard phones={contact.phones} />
      </div>

      <ContactActions contactId={contact.id} />
    </div>
  );
}
