import { Button } from '@/components/ui/button';

interface ContactsPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}

export function ContactsPagination({}: ContactsPaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
      <p className="text-sm text-muted-foreground">
        Showing 1-12 of 124 contacts
      </p>

      <div className="flex gap-2">
        <Button variant="outline" className="rounded-xl">
          Previous
        </Button>

        <Button className="rounded-xl">Next</Button>
      </div>
    </div>
  );
}
