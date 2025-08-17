import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/lable';
import { User } from '../../../models/index';
import { Tooltip, TooltipProvider } from '@/shadcn/components/ui/tooltip';
import {
  useEditUserMutation,
  useDeleteUserMutation,
} from '@/modules/users/services/userApi';
import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select';
import { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shadcn/components/ui/alert';
import { validateEmail } from '@/modules/users/utils';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shadcn/components/ui/alert-dialog';

interface UserInfoProps {
  user: User;
  onUpdateUser: (field: keyof User, value: string) => void;
  onRefetch: () => void;
}

const UserInfo = ({ user, onUpdateUser, onRefetch }: UserInfoProps) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.auth?.user?.role);
  const isAdmin = userRole === 'admin' || userRole === 'super_admin';
  const isEditingSuperAdmin = user?.role === 'super_admin';
  const isAdminEditingSuperAdmin = isAdmin && isEditingSuperAdmin;

  const isViewingSelf =
    user?.id === useSelector((state: RootState) => state.auth?.user?.userId);

  // Only allow editing for admins (or when viewing self)
  const canEdit = isAdmin || isViewingSelf;

  const [editUserMutation, { isLoading }] = useEditUserMutation();
  const [deleteUserMutation, { isLoading: isDeleting }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (user?.role) {
      setSelectedRole(user?.role);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const editUser = async () => {
    try {
      if (!selectedRole) {
        setError('Please select a role');
        return;
      }

      if (!user?.firstName?.trim() || !validateEmail(user?.email)) {
        setError(
          !user?.firstName?.trim() || !user?.email?.trim()
            ? 'First name and email are required'
            : 'Please enter a valid email address'
        );
        return;
      }

      const formData = new FormData();
      if (user.firstName) formData.append('firstName', user.firstName);
      if (user.lastName) formData.append('lastName', user.lastName);
      if (user.email) formData.append('email', user.email);
      if (profileImage) formData.append('profileImage', profileImage);

      const response = await editUserMutation({
        userId: user?.id,
        data: formData,
      }).unwrap();

      setError(null);

      setProfileImage(null);
      setImagePreview(null);

      const newProfileImage =
        response?.data?.profileImage || response?.profileImage;
      if (newProfileImage) {
        const imageUrl = newProfileImage.replace('http://localhost:3456', '');
        onUpdateUser('profileImage', imageUrl);
      }

      // Refetch to get latest data from server
      setTimeout(() => {
        onRefetch();
      }, 100);

      toast({
        description: 'User details saved successfully',
      });
    } catch (error) {
      toast({
        description:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to update user',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation({ userId: user.id }).unwrap();
      toast({
        description: 'User deleted successfully',
      });
      navigate('/user/list');
    } catch (error) {
      toast({
        description:
          (error as { data?: { message?: string } })?.data?.message ||
          'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const isRoleDisabled = () => {
    if (isViewingSelf) {
      return true;
    }

    if (isAdmin && (isEditingSuperAdmin || user?.role === 'admin')) {
      return true;
    }

    return false;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              {canEdit ? 'View and edit user details' : 'View user details'}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4 sm:space-y-6'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4'>
              <div className='relative group'>
                <img
                  className='h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border'
                  crossOrigin='anonymous'
                  src={
                    imagePreview ||
                    user?.profileImage ||
                    'https://github.com/shadcn.png'
                  }
                  alt={user?.firstName || 'Profile'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://github.com/shadcn.png';
                  }}
                />
                {canEdit && (
                  <>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='hidden'
                      id='profile-upload'
                    />
                    <label
                      htmlFor='profile-upload'
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
                        onClick={clearImageSelection}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors'
                      >
                        ×
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className='text-center sm:text-left'>
                <div className='flex flex-col sm:flex-row sm:space-x-2 sm:items-center'>
                  <h2 className='text-md font-bold text-gray-900'>
                    {user?.email}
                  </h2>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='firstName'
                  className='starlabel text-gray-700'
                >
                  First Name
                </Label>
                <Input
                  id='firstName'
                  type='text'
                  required
                  value={user?.firstName ?? ''}
                  onChange={(e) => onUpdateUser('firstName', e.target.value)}
                  disabled={
                    !canEdit ||
                    (isAdmin &&
                      (isEditingSuperAdmin || user?.role === 'admin') &&
                      !isViewingSelf)
                  }
                  className='border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='lastName'
                  className='starlabel text-gray-700'
                >
                  Last Name
                </Label>
                <Input
                  id='lastName'
                  type='text'
                  value={user?.lastName ?? ''}
                  onChange={(e) => onUpdateUser('lastName', e.target.value)}
                  disabled={
                    !canEdit ||
                    (isAdmin &&
                      (isEditingSuperAdmin || user?.role === 'admin') &&
                      !isViewingSelf)
                  }
                  className='border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='starlabel text-gray-700'
                >
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  required
                  value={user?.email ?? ''}
                  onChange={(e) => onUpdateUser('email', e.target.value)}
                  disabled={
                    !canEdit ||
                    (isAdmin &&
                      (isEditingSuperAdmin || user?.role === 'admin') &&
                      !isViewingSelf)
                  }
                  className='border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='role'
                  className='text-gray-700'
                >
                  Role
                </Label>
                <Select
                  value={selectedRole}
                  onValueChange={setSelectedRole}
                  disabled={!canEdit || isRoleDisabled()}
                >
                  <SelectTrigger
                    id='role'
                    className='border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                  >
                    <SelectValue placeholder='Select role' />
                  </SelectTrigger>
                  <SelectContent>
                    {['user', 'admin'].map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        disabled={
                          role === 'admin' && userRole !== 'super_admin'
                        }
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
              {canEdit && (
                <Button
                  disabled={isAdminEditingSuperAdmin || isLoading}
                  onClick={editUser}
                  className='w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white'
                >
                  {isLoading && (
                    <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Save Changes
                </Button>
              )}

              {isAdmin && !isViewingSelf && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='destructive'
                      disabled={isDeleting}
                      className='w-full sm:w-auto'
                    >
                      {isDeleting && (
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      <TrashIcon className='mr-2 h-4 w-4' />
                      Delete User
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the user and remove their data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteUser}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserInfo;
