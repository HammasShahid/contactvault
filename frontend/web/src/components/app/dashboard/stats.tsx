import { LayoutDashboard, Mail, Phone, Users } from 'lucide-react';
import StatsCard from './stats-card';

export default function StatsSection() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard title="Total Contacts" value="124" icon={Users} />

      <StatsCard title="Emails Stored" value="218" icon={Mail} />

      <StatsCard title="Phone Numbers" value="176" icon={Phone} />

      <StatsCard title="Active Users" value="12" icon={LayoutDashboard} />
    </section>
  );
}
