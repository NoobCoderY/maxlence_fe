import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='text-center p-8 shadow-lg rounded-lg w-full max-w-md border border-gray-200'>
        <h1 className='text-6xl font-extrabold text-red-600'>403</h1>
        <p className='mt-4 text-xl text-gray-700'>Access Forbidden</p>
        <p className='mt-2 text-gray-500'>
          You don't have permission to access this page.
        </p>
        <Link
          to='/'
          className='mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
