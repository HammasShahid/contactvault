import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  children: React.ReactNode;
};

export function ChangePasswordDialog({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>

          <DialogDescription>
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" />
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" />
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input type="password" />
          </div>

          <Button className="w-full rounded-xl">Update Password</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
