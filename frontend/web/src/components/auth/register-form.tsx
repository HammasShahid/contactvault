import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  registerSchema,
  type RegisterFormValues,
} from '@/lib/schemas/authSchemas';

interface Props {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await authApi.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      reset();
      setSuccessMessage('Account created successfully! Please log in.');
      // Brief delay so user can read the success message before tab switches
      setTimeout(() => {
        setSuccessMessage(null);
        onSuccess();
      }, 1500);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        'Registration failed. Please try again.';
      setError('root', { message });
    }
  };

  return (
    <Card className="mt-6 rounded-[2rem] border-border/60 shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-black tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription className="text-base">
          Start organizing your contacts today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                placeholder="John"
                className="h-12 rounded-xl"
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                placeholder="Doe"
                className="h-12 rounded-xl"
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
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
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="Create a secure password"
              className="h-12 rounded-xl"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              className="h-12 rounded-xl"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Server error */}
          {errors.root && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.root.message}
            </p>
          )}

          {/* Success message */}
          {successMessage && (
            <p className="rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
              {successMessage}
            </p>
          )}

          <Button
            className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
