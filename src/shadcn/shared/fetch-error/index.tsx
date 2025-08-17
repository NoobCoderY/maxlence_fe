import {
  QueryActionCreatorResult,
  QueryDefinition,
  FetchArgs,
  BaseQueryApi,
} from '@reduxjs/toolkit/query';

interface FetchErrorProps {
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      any,
      (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions: object
      ) => Promise<any>,
      any,
      'api'
    >
  >;
}

const FetchError = ({ refetch }: FetchErrorProps) => {
  return (
    <div className='flex flex-col items-center justify-center mt-4 text-center space-y-4'>
      <div className='flex justify-center items-center w-16 h-16 bg-red-100 rounded-full'>
        <svg
          className='w-8 h-8 text-red-500'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6.833c0-1.054-.816-1.918-1.85-1.995L18.917 4H5.083c-1.054 0-1.918.816-1.995 1.85L3.083 6.833V16.5c0 1.054.816 1.918 1.85 1.995l.15.007z'
          />
        </svg>
      </div>
      <h2 className='text-xl font-bold text-red-600'>Something went wrong</h2>
      <p className='text-gray-600'>
        We encountered an error while loading the data. Please try again.
      </p>
      <button
        onClick={refetch}
        className='px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
      >
        Retry
      </button>
    </div>
  );
};

export default FetchError;
