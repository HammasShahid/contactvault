import { Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { ContactResponse } from '@/types';
import { Link } from '@tanstack/react-router';

interface Props {
  contact: ContactResponse;
}

export function ContactCard({ contact }: Props) {
  const primaryEmail = contact.emails?.[0]?.email;
  const primaryPhone = contact.phones?.[0]?.phoneNumber;
  const initials =
    `${contact.firstName[0]}${contact.lastName ? contact.lastName[0] : ''}`.toUpperCase();

  return (
    <Card className="overflow-hidden rounded-[2rem] border-border/60 transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 rounded-3xl">
            <AvatarFallback className="rounded-3xl bg-primary/15 text-xl font-bold text-primary">
              {initials}
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
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{primaryEmail ?? '—'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span>{primaryPhone ?? '—'}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-xl">
            <Link to={`/contacts/${contact.id}`}>View</Link>
          </Button>
          <Button className="flex-1 rounded-xl">Edit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
