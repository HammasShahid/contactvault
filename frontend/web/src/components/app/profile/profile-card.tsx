import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function ProfileCard() {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@xyz.com',
  };

  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardContent className="p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Avatar className="h-24 w-24 rounded-3xl">
            <AvatarFallback className="rounded-3xl bg-primary/15 text-3xl font-bold text-primary">
              {user.firstName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-1 text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
