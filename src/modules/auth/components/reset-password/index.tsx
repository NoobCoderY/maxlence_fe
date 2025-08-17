import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/shadcn/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { Button } from '@/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import {
  ReloadIcon,
  LockClosedIcon,
  EyeOpenIcon,
  EyeNoneIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { resetPasswordSchema } from '../../models';
import { useResetPasswordMutation } from '../../services/authApi';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const [resetPassword] = useResetPasswordMutation();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      const response = await resetPassword({
        password: values.password,
        token,
      }).unwrap();
      console.log(response);

      if (response?.success) {
        toast({
          title: 'Password reset successful',
          description: 'Your password has been updated successfully.',
          variant: 'default',
        });
        navigate('/login');
      }
    } catch (error) {
      toast({
        description:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to reset password',
        variant: 'destructive',
      });
    }
  };

  if (!token) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white p-4'>
        <Card className='w-full max-w-md shadow-lg border border-gray-200'>
          <CardHeader className='text-center space-y-2 pb-8'>
            <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
              <ExclamationTriangleIcon className='w-8 h-8 text-red-600' />
            </div>
            <CardTitle className='text-2xl font-bold text-red-700'>
              Invalid Reset Link
            </CardTitle>
            <CardDescription className='text-gray-600 text-base'>
              The password reset link is invalid or has expired. Please request
              a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate('/forgot-password')}
              className='w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              Request New Reset Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      <Card className='w-full max-w-md shadow-lg border border-gray-200'>
        <CardHeader className='text-center space-y-2 pb-8'>
          <div className='mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
            <LockClosedIcon className='w-8 h-8 text-gray-700' />
          </div>
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Reset Password
          </CardTitle>
          <CardDescription className='text-gray-600 text-base'>
            Create a new secure password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700'>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter your new password'
                          {...field}
                          className='pl-10 pr-10 h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                          {showPassword ? (
                            <EyeNoneIcon className='w-4 h-4' />
                          ) : (
                            <EyeOpenIcon className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700'>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <LockClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='Confirm your new password'
                          {...field}
                          className='pl-10 pr-10 h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                          {showConfirmPassword ? (
                            <EyeNoneIcon className='w-4 h-4' />
                          ) : (
                            <EyeOpenIcon className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                Reset Password
              </Button>
            </form>
          </Form>

          <div className='text-center'>
            <p className='text-sm text-gray-500'>
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className='text-gray-700 hover:text-gray-900 font-medium hover:underline'
              >
                Back to Login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
