import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '#/components/ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '#/components/ui/table';

const contacts = [
  {
    id: 1,
    name: 'Babar Azam',
    title: 'Software Engineer',
    email: 'babar@xyz.com',
    phone: '03123456789',
  },
  {
    id: 2,
    name: 'John Doe',
    title: 'Product Designer',
    email: 'john@xyz.com',
    phone: '03001112222',
  },
  {
    id: 3,
    name: 'Sarah Khan',
    title: 'Marketing Lead',
    email: 'sarah@xyz.com',
    phone: '03225556666',
  },
  {
    id: 4,
    name: 'Ali Raza',
    title: 'Frontend Developer',
    email: 'ali@xyz.com',
    phone: '03334445555',
  },
];

export default function ContactsTable() {
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

        <Badge className="rounded-full px-4 py-1">4 Contacts</Badge>
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
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  className="h-20 transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-2xl">
                        <AvatarFallback className="rounded-2xl bg-primary/15 font-bold text-primary">
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Contact ID #{contact.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{contact.title}</TableCell>

                  <TableCell>{contact.email}</TableCell>

                  <TableCell>{contact.phone}</TableCell>

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
      </CardContent>
    </Card>
  );
}
