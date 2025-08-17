import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shadcn/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select';
import UserListTable from './user-list-table';
import { useDebounce } from '@/hooks/useDebounce';
import { useListAllUsersQuery } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import { setAllUser } from '../../slice/userSlice';
import { CustomPagination } from '@/shadcn/shared/custom-pagination';

export default function UsersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('DESC');
  const dispatch = useDispatch();

  const itemsPerPage = 10;

  const {
    data: usersResponse,
    isError,
    refetch,
    isLoading,
  } = useListAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearchTerm,
    sortBy: sortBy,
    sortOrder: sortOrder,
  });

  useEffect(() => {
    if (usersResponse?.data) {
      dispatch(setAllUser(usersResponse.data));
    }
  }, [usersResponse, dispatch]);

  useEffect(() => {
    refetch();
  }, [currentPage, debouncedSearchTerm, sortBy, sortOrder, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortBy, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = useMemo(
    () => usersResponse?.pagination?.totalPages || 0,
    [usersResponse]
  );

  return (
    <div className='container mx-auto pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl'>
      <div className='flex justify-between items-center mb-4 sm:mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
          User Management
        </h1>
      </div>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
          <div className='relative w-full sm:w-auto'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search users...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 w-full sm:w-64 border-gray-300 focus:border-gray-500 focus:ring-gray-500'
            />
          </div>
          <div className='flex space-x-2 w-full sm:w-auto'>
            <Select
              value={sortBy}
              onValueChange={(value: string) => setSortBy(value)}
            >
              <SelectTrigger className='w-full sm:w-[180px] border-gray-300 focus:border-gray-500 focus:ring-gray-500'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='firstName'>First Name</SelectItem>
                <SelectItem value='lastName'>Last Name</SelectItem>
                <SelectItem value='email'>Email</SelectItem>
                <SelectItem value='createdAt'>Created Date</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value: string) => setSortOrder(value)}
            >
              <SelectTrigger className='w-full sm:w-[120px] border-gray-300 focus:border-gray-500 focus:ring-gray-500'>
                <SelectValue placeholder='Order' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ASC'>Ascending</SelectItem>
                <SelectItem value='DESC'>Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <UserListTable
          isError={isError}
          refetch={refetch}
          isLoading={isLoading}
        />
      </div>

      <div className='mt-5'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
