import { AddContactSheet } from './add-contact-sheet';

export function ContactsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Contacts</h1>

        <p className="mt-2 text-muted-foreground">
          Manage all your contacts from one place.
        </p>
      </div>

      <AddContactSheet />
    </div>
  );
}
