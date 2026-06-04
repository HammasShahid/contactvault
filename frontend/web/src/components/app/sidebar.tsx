import { LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import SidebarItem from './sidebar-item';

export function Sidebar({ className = '' }: { className?: string }) {
  return (
    <aside
      className={`h-full w-[280px] flex-col border-r border-border bg-sidebar ${className}`}
    >
      <div className="flex h-20 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-foreground shadow-lg shadow-primary/20">
            C
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">ContactHub</h1>
            <p className="text-xs text-muted-foreground">Contact Management</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="space-y-2">
          <SidebarItem icon={LayoutDashboard} active>
            Dashboard
          </SidebarItem>

          <SidebarItem icon={Users}>Contacts</SidebarItem>

          <SidebarItem icon={Settings}>Settings</SidebarItem>
        </nav>

        <div>
          <SidebarItem icon={LogOut}>Logout</SidebarItem>
        </div>
      </div>
    </aside>
  );
}
