import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditContactSheet } from '../edit-contact-sheet';
import type { ContactResponse } from '@/types';

interface Props {
  contact: ContactResponse; // full contact needed to pre-fill the form
  isDeleting: boolean;
  onDelete: () => void;
}

export function ContactActions({ contact, isDeleting, onDelete }: Props) {
  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
        <EditContactSheet contact={contact} />
        <Button
          variant="destructive"
          className="flex-1 rounded-2xl"
          size="lg"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? 'Deleting...' : 'Delete Contact'}
        </Button>
      </CardContent>
    </Card>
  );
}
