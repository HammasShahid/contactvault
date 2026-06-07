import {
  createFileRoute,
  Link,
  useRouter,
} from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPersistedToken } from '#/store/authStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getPersistedToken();
    if (token) {
      router.navigate({
        to: '/dashboard',
        replace: true,
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-100px] h-[300px] w-[300px] rounded-full bg-chart-3/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
              C
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                {import.meta.env.VITE_APP_NAME}
              </h1>
              <p className="text-xs text-muted-foreground">
                Smart Contact Management
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-4 md:flex">
            <Button asChild variant="ghost">
              <Link to="." href="#features">
                Features
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-8 lg:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <Badge className="mb-6 rounded-full bg-primary/10 px-4 py-2 text-primary hover:bg-primary/10">
              Built with Spring Boot & React
            </Badge>

            <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight lg:text-7xl">
              Manage Your Contacts
              <span className="block text-primary">Smarter & Faster</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Organize contacts, emails, and phone numbers in one modern,
              secure, and beautifully designed platform.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="h-14 rounded-2xl px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-1"
              >
                <Link to="/auth">Get Started</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 rounded-2xl px-8 text-base font-semibold transition-all hover:-translate-y-1"
              >
                <Link to="/auth">Login</Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-10">
              <div>
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="text-sm text-muted-foreground">
                  Contacts Managed
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">99.9%</h3>
                <p className="text-sm text-muted-foreground">Secure Access</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Modern Architecture
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

            <Card className="relative rounded-[2rem] border-border/60 bg-card/80 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <div>
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <p className="text-sm text-muted-foreground">
                      Contact Overview
                    </p>
                  </div>

                  <Button className="rounded-2xl font-semibold">
                    + Add Contact
                  </Button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ['Total Contacts', '124'],
                    ['Emails', '218'],
                    ['Phones', '176'],
                  ].map(([title, value]) => (
                    <Card key={title} className="rounded-2xl bg-background">
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <h3 className="mt-2 text-3xl font-bold">{value}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  Search contacts...
                </div>

                <div className="mt-6 space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <Card
                      key={item}
                      className="rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 font-bold text-primary">
                            B
                          </div>

                          <div>
                            <h4 className="font-semibold">Babar Azam</h4>
                            <p className="text-sm text-muted-foreground">
                              Software Engineer
                            </p>
                          </div>
                        </div>

                        <div className="hidden items-center gap-10 md:flex">
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">
                              babar@xyz.com
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">
                              03123456789
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight lg:text-5xl">
              Everything You Need
            </h2>

            <p className="mt-5 text-lg text-muted-foreground">
              Built with modern technologies for speed, scalability, and a
              seamless user experience.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: 'Smart Organization',
                description:
                  'Store multiple emails and phone numbers for every contact with ease.',
              },
              {
                title: 'Secure Authentication',
                description:
                  'JWT-based authentication and protected APIs for secure access.',
              },
              {
                title: 'Fast & Responsive',
                description:
                  'Powered by Spring Boot, React, and TanStack Start for modern performance.',
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="group rounded-[2rem] border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                    ✦
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">{feature.title}</h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Card className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] border-border bg-secondary text-secondary-foreground shadow-2xl">
          <CardContent className="px-8 py-20 lg:px-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-secondary-foreground hover:bg-white/5">
                Start Managing Smarter
              </Badge>

              <h2 className="text-4xl font-black tracking-tight lg:text-6xl">
                Build Better Relationships With Organized Contacts
              </h2>

              <p className="mt-6 text-lg text-secondary-foreground/80">
                Simplify contact management with a clean and modern experience.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  className="h-14 rounded-2xl px-8 text-base font-semibold transition-all hover:-translate-y-1"
                >
                  <Link to="/auth">Create Account</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 {import.meta.env.VITE_APP_NAME}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
