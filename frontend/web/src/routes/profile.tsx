import { LogoutCard } from '#/components/app/profile/logout-card';
import { ProfileCard } from '#/components/app/profile/profile-card';
import { ProfileHeader } from '#/components/app/profile/profile-header';
import { SecurityCard } from '#/components/app/profile/security-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 lg:p-8">
      <ProfileHeader />

      <ProfileCard />

      <SecurityCard />

      <LogoutCard />
    </div>
  );
}
