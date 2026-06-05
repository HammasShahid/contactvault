import { useState } from 'react';
import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '#/components/ui/table';
import { useContacts } from '@/hooks/useContacts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 5;

export default function ContactsTable() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useContacts(page, PAGE_SIZE);

  const contacts = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const getInitials = (firstName: string, lastName?: string) =>
    `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`.toUpperCase();

  const getPrimaryEmail = (contact: (typeof contacts)[0]) =>
    contact.emails[0]?.email ?? '—';

  const getPrimaryPhone = (contact: (typeof contacts)[0]) =>
    contact.phones[0]?.phoneNumber ?? '—';

  return (
    <Card className="rounded-[2rem] border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-black tracking-tight">
            Recent Contacts
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Recently added contacts in your account.
          </p>
        </div>
        <Badge className="rounded-full px-4 py-1">
          {isLoading ? '...' : `${totalElements} Contacts`}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="h-14">User</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Loading contacts...
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-destructive"
                  >
                    Failed to load contacts.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !isError && contacts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                contacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className="h-20 transition-colors hover:bg-muted/40"
                  >
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-2xl">
                          <AvatarFallback className="rounded-2xl bg-primary/15 font-bold text-primary">
                            {getInitials(contact.firstName, contact.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {contact.firstName} {contact.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Contact ID #{contact.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{contact.title ?? '—'}</TableCell>
                    <TableCell>{getPrimaryEmail(contact)}</TableCell>
                    <TableCell>{getPrimaryPhone(contact)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" className="rounded-xl">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
