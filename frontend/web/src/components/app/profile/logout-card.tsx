import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { LogoutDialog } from './logout-dialog';

export function LogoutCard() {
  return (
    <Card className="rounded-[2rem] border-destructive/20">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>

        <CardDescription>
          Logout from your account on this device.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LogoutDialog />
      </CardContent>
    </Card>
  );
}
