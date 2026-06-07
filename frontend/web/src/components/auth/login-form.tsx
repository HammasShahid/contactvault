import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
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
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';
import { loginSchema, type LoginFormValues } from '@/lib/schemas/authSchemas';

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { token } = await authApi.login(values);
      const user = await authApi.me(token);
      setAuth(token, user);
      router.navigate({ to: '/dashboard' });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? 'Incorrect email or password.';
      setError('root', { message });
    }
  };

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
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              className="h-12 rounded-xl"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              className="h-12 rounded-xl"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
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

          {errors.root && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.root.message}
            </p>
          )}

          <Button
            className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
