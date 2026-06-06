import { Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  contactId: number;
};

export function ContactActions({ contactId }: Props) {
  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
        <Button className="flex-1 rounded-2xl" size="lg">
          <Edit className="mr-2 h-4 w-4" />
          Edit Contact
        </Button>

        <Button variant="destructive" className="flex-1 rounded-2xl" size="lg">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Contact
        </Button>
      </CardContent>
    </Card>
  );
}
