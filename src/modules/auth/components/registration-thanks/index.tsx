import { useNavigate } from 'react-router-dom';
import { Button } from '@/shadcn/components/ui/button';

export default function RegistrationThanks() {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center'>
        <div className='mb-6'>
          <div className='w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            Registration Successful!
          </h1>
          <p className='text-gray-600 mb-6'>
            Thanks for registration. Please check your email to verify your
            account and then login.
          </p>
        </div>

        <Button
          onClick={() => navigate('/login')}
          className='w-full bg-black hover:bg-gray-800 text-white'
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}
