import { createFileRoute, Link } from '@tanstack/react-router';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '#/components/auth/login-form';
import RegisterForm from '#/components/auth/register-form';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[280px] w-[280px] rounded-full bg-chart-3/20 blur-3xl" />
      </div>

      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-secondary p-12 text-secondary-foreground lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.25),transparent_40%)]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-foreground shadow-lg shadow-primary/30">
                C
              </div>

              <div>
                <h1 className="text-xl font-bold">ContactVault</h1>
                <p className="text-sm text-secondary-foreground/70">
                  Smart Contact Management
                </p>
              </div>
            </div>

            <div className="mt-20 max-w-md">
              <h2 className="text-5xl font-black leading-tight tracking-tight">
                Manage Contacts
                <span className="block text-primary">With Confidence</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-secondary-foreground/80">
                Securely organize contacts, emails, and phone numbers in one
                modern platform.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-secondary-foreground/70">
                Total Contacts
              </p>
              <h3 className="mt-2 text-3xl font-bold">10,000+</h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-secondary-foreground/70">
                Secure Authentication
              </p>
              <h3 className="mt-2 text-3xl font-bold">JWT Protected</h3>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <Tabs defaultValue="login" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-muted p-1">
              <TabsTrigger value="login" className="rounded-xl cursor-pointer">
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-xl cursor-pointer"
              >
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            {/* Register */}
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link
                to="/"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                to="/"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
