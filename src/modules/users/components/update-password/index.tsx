import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
import { resetPasswordSchema } from '@/modules/auth/models';
import { useEditUserMutation } from '../../services/userApi';
import { logout } from '@/modules/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function UpdatePasswordForm() {
  const user = useSelector((state: RootState) => state.auth?.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { toast } = useToast();
  const [editUser] = useEditUserMutation();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      const formData = new FormData();
      formData.append('new_password', values.password);
      formData.append('confirm_password', values.confirmPassword);
      const response = await editUser({
        data: formData,
        userId: user?.userId,
      }).unwrap();

      if (response?.status == 200) {
        toast({ title: 'Password updated successfully', variant: 'default' });
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      toast({
        description: (error as { data?: { error_code?: string } })?.data
          ?.error_code,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='w-full'>
      <h1 className='text-2xl mb-2 font-bold text-gray-800'>Update Password</h1>
      <h3 className='text-sm mb-4 text-gray-600'>
        Create a new secure password for your account
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-3'
        >
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your new password'
                    {...field}
                    className='border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                  />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Confirm your new password'
                    {...field}
                    className='border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full bg-gray-900 hover:bg-gray-800 text-white'
          >
            {form.formState.isSubmitting && (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            )}
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
