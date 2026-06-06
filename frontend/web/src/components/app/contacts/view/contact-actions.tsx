import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  contactId: number;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function ContactActions({ isDeleting, onEdit, onDelete }: Props) {
  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
        <Button className="flex-1 rounded-2xl" size="lg" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Contact
        </Button>
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
