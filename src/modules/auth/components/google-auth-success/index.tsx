import  { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { setUser } from '../../auth-slice';
import { useGetProfileQuery } from '../../services/authApi';

export default function GoogleAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const accessToken = searchParams.get('token');
  const refreshToken = searchParams.get('refreshToken');

  useEffect(() => {
    if (accessToken && refreshToken) {
      const tokens = {
        accessToken,
        refreshToken,
      };

      dispatch(
        setUser({
          user: null,
          token: tokens,
        })
      );
    } else {
      toast({
        title: 'Authentication Failed',
        description: 'No authentication tokens found.',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [accessToken, refreshToken, dispatch, navigate, toast]);

  const {
    data: profileData,
    error: profileError,
    isLoading,
  } = useGetProfileQuery(undefined, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (profileData && accessToken && refreshToken) {
      const user = {
        userId: profileData?.data?.id,
        firstName: profileData?.data?.firstName,
        email: profileData?.data?.email,
        role: profileData?.data?.role,
        lastName: profileData?.data?.lastName,
        profileImage: profileData?.data?.profileImage,
      };

      dispatch(
        setUser({
          user: user,
          token: {
            accessToken,
            refreshToken,
          },
        })
      );

      toast({
        title: 'Login Successful!',
        description: 'Welcome back!',
        variant: 'default',
      });

      navigate('/');
    }
  }, [profileData, accessToken, refreshToken, dispatch, navigate, toast]);

  useEffect(() => {
    if (profileError) {
      toast({
        title: 'Profile Loading Failed',
        description:
          'Failed to load user profile. Please try logging in again.',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [profileError, navigate, toast]);

  if (isLoading || (!profileData && accessToken)) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-4 text-lg'>Completing authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <p className='text-lg'>Processing authentication...</p>
      </div>
    </div>
  );
}
