import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { ReloadIcon } from '@radix-ui/react-icons';
import { signupFormSchema } from '../../models';
import { useRegisterUserMutation } from '../../services/authApi';
import { BASE_URL } from '@/app/constats';
import { first } from 'lodash';

export default function SignupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      const registrationData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      };

      await registerUser(registrationData).unwrap();
      toast({
        title: 'Registration Successful!',
        description:
          'Thanks for registration. Please check your email to verify your account and then login.',
        variant: 'default',
      });
      navigate('/auth/thanks');
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description:
          error?.data?.message || 'An error occurred during registration',
        variant: 'destructive',
      });
    }
  };


  const handleGoogleSignIn = () => {
    window.location.href = `${BASE_URL}/oauth/google`;
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl mb-2 font-bold text-center text-gray-800'>
          Sign Up
        </h1>
        <h3 className='text-md mb-6 text-center text-gray-600'>
          Create a new account
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='First Name'
                      {...field}
                      className='border-gray-300 focus:border-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Last Name'
                      {...field}
                      className='border-gray-300 focus:border-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Email'
                      {...field}
                      className='border-gray-300 focus:border-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Password'
                      {...field}
                      className='border-gray-300 focus:border-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full bg-black hover:bg-gray-800 text-white'
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              Sign Up
            </Button>
          </form>
        </Form>
        <div className='flex items-center my-4'>
          <div className='flex-grow h-px bg-gray-300' />
          <span className='mx-2 text-gray-400'>or</span>
          <div className='flex-grow h-px bg-gray-300' />
        </div>
        <Button
          type='button'
          variant='outline'
          className='w-full border-gray-300 text-gray-700 hover:bg-gray-100'
          onClick={handleGoogleSignIn}
        >
          <svg
            className='h-5 w-5 mr-2'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path
              fill='#4285F4'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='#34A853'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='#FBBC05'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='#EA4335'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
