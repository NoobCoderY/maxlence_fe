import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { useToast } from '@/shadcn/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { Loader2 } from 'lucide-react';
import {
  useUserDetailsQuery,
  useEditUserMutation,
} from '../../services/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { Loader } from '@/shadcn/shared/laoder';
import { setUser } from '@/modules/auth/auth-slice';

const editProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
});

export default function EditProfile() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  console.log(user);

  const {
    data: userDetails,
    isLoading: isUserDetailsLoading,
    refetch: refetchUser,
  } = useUserDetailsQuery({ userId: user?.userId || '' });

  const [editUser, { isLoading: isEditUserLoading }] = useEditUserMutation();

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  useEffect(() => {
    if (userDetails?.data) {
      form.setValue('firstName', userDetails.data.firstName || '');
      form.setValue('lastName', userDetails.data.lastName || '');
      form.setValue('email', userDetails.data.email || '');

      if (userDetails.data.profileImage) {
        const imageUrl = userDetails.data.profileImage.replace(
          'http://localhost:3456',
          ''
        );
        setImagePreview(imageUrl);
      }
    }
  }, [userDetails, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);

      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await editUser({
        userId: user?.userId || '',
        data: formData,
      }).unwrap();

      if (response?.data) {
        const updatedUser = {
          userId: user?.userId || '',
          firstName: response.data.firstName || values.firstName,
          lastName: response.data.lastName || values.lastName,
          email: response.data.email || values.email,
          role: user?.role || '',
          profileImage: response.data.profileImage || user?.profileImage,
        };

        const payLoad = {
          token: token || null,
          user: updatedUser,
        };

        dispatch(setUser(payLoad));
      }

      refetchUser();
      setProfileImage(null);
      setImagePreview(null);

      toast({
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        description:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to update profile',
        variant: 'destructive',
      });
    }
  }

  const isDisabled = false;

  if (isUserDetailsLoading) {
    return <Loader />;
  }

  return (
    <Card className='mr-2'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Edit Profile</CardTitle>
        <CardDescription>View and edit your profile details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <div className='relative group'>
              <img
                className='h-20 w-20 rounded-full object-cover border-2 border-gray-300'
                src={
                  imagePreview ||
                  user?.profileImage ||
                  'https://github.com/shadcn.png'
                }
                crossOrigin='anonymous'
                alt={user?.firstName || 'Profile'}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://github.com/shadcn.png';
                }}
              />
              <input
                id='profile-image-upload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
              <label
                htmlFor='profile-image-upload'
                className='absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              >
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </label>
              {profileImage && (
                <button
                  type='button'
                  onClick={() => {
                    setProfileImage(null);
                    setImagePreview(null);
                  }}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors'
                >
                  ×
                </button>
              )}
            </div>
            <div>
              <h2 className='text-2xl font-bold'>{user?.firstName}</h2>
              <p className='text-muted-foreground'>{user?.email}</p>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=''
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your first name'
                        {...field}
                        disabled={isDisabled}
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
                  <FormItem className='space-y-2'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your last name'
                        {...field}
                        disabled={isDisabled}
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
                  <FormItem className='space-y-2'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your email'
                        {...field}
                        disabled={isDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className='space-y-2'>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    value={userDetails?.data?.role || ''}
                    disabled={true}
                    readOnly
                  />
                </FormControl>
              </FormItem>
            </div>
            <div className='flex gap-6'>
              <Button
                type='submit'
                disabled={isEditUserLoading}
                className='mt-4 w-[50%] bg-gray-900 hover:bg-gray-800 text-white'
              >
                {isEditUserLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
