import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  EnvelopeClosedIcon,
  LockClosedIcon,
  ArrowLeftIcon,
} from '@radix-ui/react-icons';
import { forgotPasswordSchema } from '../../models';
import { useForgotPasswordMutation } from '../../services/authApi';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      await forgotPassword(values).unwrap();
      toast({
        title: 'Reset link sent successfully',
        description: 'Please check your email for the password reset link.',
        variant: 'default',
      });
    } catch (error) {
      toast({
        description:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to send reset link',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      <Card className='w-full max-w-md shadow-lg border border-gray-200'>
        <CardHeader className='text-center space-y-2 pb-8'>
          <div className='mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
            <LockClosedIcon className='w-8 h-8 text-gray-700' />
          </div>
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Forgot Password?
          </CardTitle>
          <CardDescription className='text-gray-600 text-base'>
            No worries! Enter your email address and we'll send you a reset
            link.
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700'>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <EnvelopeClosedIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                        <Input
                          type='email'
                          placeholder='Enter your email address'
                          {...field}
                          className='pl-10 h-12 border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200'
                disabled={isLoading}
              >
                {isLoading && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                Send Reset Link
              </Button>
            </form>
          </Form>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-2 text-gray-500'>or</span>
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200'
            onClick={() => navigate('/login')}
          >
            <ArrowLeftIcon className='mr-2 h-4 w-4' />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
