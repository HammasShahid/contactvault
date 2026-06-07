import MobileSidebar from '../mobile-sidebar';
import { AddContactSheet } from './add-contact-sheet';

export function ContactsHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 lg:hidden">
            <MobileSidebar />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Contacts</h1>
        </div>

        <p className="mt-2 text-muted-foreground">
          Manage all your contacts from one place.
        </p>
      </div>

      <AddContactSheet />
    </div>
  );
}
