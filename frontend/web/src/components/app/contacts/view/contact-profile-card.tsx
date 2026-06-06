import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  contact: {
    firstName: string;
    lastName: string;
    title?: string;
  };
};

export function ContactProfileCard({ contact }: Props) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-border/60">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-28 w-28 rounded-3xl">
            <AvatarFallback className="rounded-3xl bg-primary/15 text-4xl font-bold text-primary">
              {contact.firstName[0]}
            </AvatarFallback>
          </Avatar>

          <h1 className="mt-6 text-4xl font-black tracking-tight">
            {contact.firstName} {contact.lastName}
          </h1>

          <Badge variant="secondary" className="mt-3 rounded-full">
            {contact.title || 'Contact'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
