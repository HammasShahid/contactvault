import { createFileRoute } from '@tanstack/react-router';
import Stats from '#/components/app/dashboard/stats';
import ActivityCard from '#/components/app/dashboard/activity-card';
import ContactsTable from '#/components/app/dashboard/contacts-table';
import AppHeader from '#/components/app/header';

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
});

export default function RouteComponent() {
  return (
    <>
      <AppHeader pageName="Dashboard" />

      <div className="flex-1 space-y-8 overflow-y-auto p-6 lg:p-8">
        <Stats />

        <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
          <ContactsTable />

          <ActivityCard />
        </div>
      </div>
    </>
  );
}
