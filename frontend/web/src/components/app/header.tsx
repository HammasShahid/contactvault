import { Bell, Plus, Search } from 'lucide-react';
import MobileSidebar from './mobile-sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AddContactSheet } from './contacts/add-contact-sheet';

export default function AppHeader({ pageName }: { pageName: string }) {
  return (
    <header className="flex flex-col gap-5 border-b border-border bg-background/70 px-6 py-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 lg:hidden">
          <MobileSidebar />
        </div>
        <h1 className="text-3xl font-black tracking-tight">{pageName}</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <AddContactSheet />
      </div>
    </header>
  );
}
