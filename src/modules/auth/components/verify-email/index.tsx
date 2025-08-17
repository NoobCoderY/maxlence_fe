import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { Button } from '@/shadcn/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useVerifyEmailQuery } from '../../services/authApi';
import { useToast } from '@/shadcn/components/ui/use-toast';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = searchParams.get('token') || '';

  const { data, isLoading, error, refetch } = useVerifyEmailQuery(
    {
      token: token,
    },
    {
      skip: !token,
    }
  );

  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      toast({
        title: 'Invalid Link',
        description: 'No verification token found in the URL.',
        variant: 'destructive',
      });
      return;
    }
  }, [token, toast]);

  useEffect(() => {
    if (data) {
      setVerificationStatus('success');
      toast({
        title: 'Email Verified Successfully!',
        description:
          'Your email has been verified. You can now login to your account.',
        variant: 'default',
      });
    } else if (error) {
      setVerificationStatus('error');
      toast({
        title: 'Verification Failed',
        description: 'The verification link is invalid or has expired.',
        variant: 'destructive',
      });
    } else if (isLoading) {
      setVerificationStatus('loading');
    }
  }, [data, error, isLoading, toast]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleRetryVerification = () => {
    if (token) {
      refetch();
      setVerificationStatus('loading');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='p-6 rounded-lg shadow-lg bg-white border border-gray-300'
      >
        <Card className='w-[400px] bg-transparent border-0'>
          <CardHeader className='text-center'>
            <CardTitle className='text-gray-900 text-2xl font-bold'>
              {verificationStatus === 'loading'
                ? 'Verifying Email...'
                : verificationStatus === 'success'
                ? 'Email Verified!'
                : 'Verification Failed'}
            </CardTitle>
            <CardDescription className='text-gray-600'>
              {verificationStatus === 'loading'
                ? 'Please wait while we verify your email address.'
                : verificationStatus === 'success'
                ? 'Your email has been successfully verified. You can now login to your account.'
                : 'The verification link is invalid or has expired. Please try again or request a new verification email.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center space-y-4'>
            {verificationStatus === 'loading' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <Loader2 className='h-10 w-10 text-gray-500' />
              </motion.div>
            ) : verificationStatus === 'success' ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <CheckCircle className='h-12 w-12 text-green-500' />
                </motion.div>
                <Button
                  onClick={handleGoToLogin}
                  className='w-full bg-black hover:bg-gray-800 text-white'
                >
                  Go to Login
                </Button>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <XCircle className='h-12 w-12 text-red-500' />
                </motion.div>
                <div className='flex flex-col space-y-2 w-full'>
                  <Button
                    onClick={handleRetryVerification}
                    variant='outline'
                    className='w-full'
                    disabled={!token}
                  >
                    Retry Verification
                  </Button>
                  <Button
                    onClick={handleGoToLogin}
                    className='w-full bg-black hover:bg-gray-800 text-white'
                  >
                    Go to Login
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
