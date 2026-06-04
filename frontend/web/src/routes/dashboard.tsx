import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

import Stats from '#/components/app/dashboard/stats';
import { Sidebar } from '#/components/app/sidebar';
import ActivityCard from '#/components/app/dashboard/activity-card';
import ContactsTable from '#/components/app/dashboard/contacts-table';
import AppHeader from '#/components/app/header';

export default function RouteComponent() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar className="hidden lg:flex" />

        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader pageName="Dashboard" />

          <div className="flex-1 space-y-8 overflow-y-auto p-6 lg:p-8">
            <Stats />

            <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
              <ContactsTable />

              <ActivityCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
