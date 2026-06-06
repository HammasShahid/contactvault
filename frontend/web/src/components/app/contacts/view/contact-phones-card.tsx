import { Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  phones: {
    id: number;
    label: string;
    phoneNumber: string;
  }[];
};

export function ContactPhonesCard({ phones }: Props) {
  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Phone Numbers
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {phones.map((phone) => (
          <div key={phone.id} className="rounded-2xl border border-border p-4">
            <p className="text-sm text-muted-foreground">{phone.label}</p>

            <p className="mt-1 font-medium">{phone.phoneNumber}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
