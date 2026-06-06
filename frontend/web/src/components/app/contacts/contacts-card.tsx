import { Mail, Phone } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    title?: string;
    email?: string;
    phone?: string;
  };
};

export function ContactCard({ contact }: Props) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-border/60 transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 rounded-3xl">
            <AvatarFallback className="rounded-3xl bg-primary/15 text-xl font-bold text-primary">
              {contact.firstName[0]}
            </AvatarFallback>
          </Avatar>

          <h3 className="mt-4 text-xl font-bold">
            {contact.firstName} {contact.lastName}
          </h3>

          <Badge variant="secondary" className="mt-2 rounded-full">
            {contact.title || 'Contact'}
          </Badge>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span className="truncate">{contact.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>{contact.phone}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-xl">
            View
          </Button>

          <Button className="flex-1 rounded-xl">Edit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
