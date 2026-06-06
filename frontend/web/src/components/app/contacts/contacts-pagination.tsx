import { Button } from '@/components/ui/button';

interface Props {
  page: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ContactsPagination({
  page,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
}: Props) {
  const from = totalElements === 0 ? 0 : page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, totalElements);

  if (totalElements === 0) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
      <p className="text-sm text-muted-foreground">
        Showing {from}–{to} of {totalElements} contacts
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          className="rounded-xl"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
