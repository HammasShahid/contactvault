import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';
import { Sidebar } from '#/components/app/sidebar';
import { getPersistedToken } from '@/store/authStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const router = useRouter();

  useEffect(() => {
    const token = getPersistedToken();
    if (!token) {
      router.navigate({ to: '/auth', replace: true });
    }
  }, []);

  // If no token, render nothing while redirect happens
  if (!getPersistedToken()) return null;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar className="hidden lg:flex" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
