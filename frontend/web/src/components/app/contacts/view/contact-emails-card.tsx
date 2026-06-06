import { Mail } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  emails: {
    id: number;
    label: string;
    email: string;
  }[];
};

export function ContactEmailsCard({ emails }: Props) {
  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Email Addresses
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {emails.map((email) => (
          <div key={email.id} className="rounded-2xl border border-border p-4">
            <p className="text-sm text-muted-foreground">{email.label}</p>

            <p className="mt-1 font-medium">{email.email}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
