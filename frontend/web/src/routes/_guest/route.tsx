import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';
import { getPersistedToken } from '@/store/authStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
});

function GuestLayout() {
  const router = useRouter();

  useEffect(() => {
    const token = getPersistedToken();
    if (token) {
      router.navigate({ to: '/dashboard', replace: true });
    }
  }, []);

  if (getPersistedToken()) return null;

  return <Outlet />;
}
