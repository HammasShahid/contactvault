import { Bell, Plus, Search } from 'lucide-react';
import MobileSidebar from './mobile-sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function AppHeader({ pageName }: { pageName: string }) {
  return (
    <header className="flex flex-col gap-5 border-b border-border bg-background/70 px-6 py-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-tight">{pageName}</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 lg:hidden">
          <MobileSidebar />
        </div>
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search contacts..."
            className="h-12 rounded-2xl border-border bg-card pl-11"
          />
        </div>

        <Button className="h-12 rounded-2xl px-6 font-semibold shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
