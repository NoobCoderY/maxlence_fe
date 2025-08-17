import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='text-center p-8 shadow-lg rounded-lg border border-gray-200'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='mt-4 text-xl text-gray-600'>Page Not Found</p>
        <p className='mt-2 text-gray-500'>
          The page you are looking for does not exist.
        </p>
        <Link
          to='/'
          className='mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-800'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
