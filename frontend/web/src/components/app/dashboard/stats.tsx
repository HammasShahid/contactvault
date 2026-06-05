import { LayoutDashboard, Mail, Phone, Users } from 'lucide-react';
import StatsCard from './stats-card';
import { useContacts } from '@/hooks/useContacts';

export default function StatsSection() {
  const { data, isLoading } = useContacts(0, 1);

  const totalContacts = data?.totalElements ?? 0;
  const totalEmails =
    data?.content.reduce((acc, c) => acc + c.emails.length, 0) ?? 0;
  const totalPhones =
    data?.content.reduce((acc, c) => acc + c.phones.length, 0) ?? 0;

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Contacts"
        value={isLoading ? '...' : String(totalContacts)}
        icon={Users}
      />
      <StatsCard
        title="Emails Stored"
        value={isLoading ? '...' : String(totalEmails)}
        icon={Mail}
      />
      <StatsCard
        title="Phone Numbers"
        value={isLoading ? '...' : String(totalPhones)}
        icon={Phone}
      />
      <StatsCard title="Active Users" value="1" icon={LayoutDashboard} />
    </section>
  );
}
