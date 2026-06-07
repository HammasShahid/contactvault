import { KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { ChangePasswordDialog } from './change-password-dialog';

export function SecurityCard() {
  return (
    <Card className="rounded-[2rem] border-border/60">
      <CardHeader>
        <CardTitle>Security</CardTitle>

        <CardDescription>
          Update your password regularly to keep your account secure.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChangePasswordDialog>
          <Button className="rounded-xl">
            <KeyRound className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </ChangePasswordDialog>
      </CardContent>
    </Card>
  );
}
