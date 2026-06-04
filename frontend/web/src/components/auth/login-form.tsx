import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function LoginForm() {
  return (
    <Card className="mt-6 rounded-[2rem] border-border/60 shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-black tracking-tight">
          Welcome Back
        </CardTitle>

        <CardDescription className="text-base">
          Login to continue managing your contacts.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Forgot Password?
            </button>
          </div>

          <Button className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
