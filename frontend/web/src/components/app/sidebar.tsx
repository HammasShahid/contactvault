import { LayoutDashboard, LogOut, User, Users } from 'lucide-react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { useAuthStore } from '@/store/authStore';
import SidebarItem from './sidebar-item';

export function Sidebar({ className = '' }: { className?: string }) {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
    clearAuth();
    router.navigate({ to: '/auth' });
  };

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
            <h1 className="text-lg font-bold tracking-tight">ContactVault</h1>
            <p className="text-xs text-muted-foreground">Contact Management</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="space-y-2">
          <SidebarItem
            icon={LayoutDashboard}
            active={isActive('/dashboard')}
            onClick={() => router.navigate({ to: '/dashboard' })}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            icon={Users}
            active={isActive('/contacts')}
            onClick={() => router.navigate({ to: '/contacts' })}
          >
            Contacts
          </SidebarItem>
          <SidebarItem
            icon={User}
            active={isActive('/profile')}
            onClick={() => router.navigate({ to: '/profile' })}
          >
            Profile
          </SidebarItem>
        </nav>

        <div>
          <SidebarItem icon={LogOut} onClick={handleLogout}>
            Logout
          </SidebarItem>
        </div>
      </div>

      {user && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 font-bold text-primary">
              {user.firstName[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
