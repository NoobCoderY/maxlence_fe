import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shadcn/components/ui/dropdown-menu';
import { Button } from '@/shadcn/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../models/index';
import FetchError from '@/shadcn/shared/fetch-error';
import type {
  BaseQueryApi,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import SkeletonLoader from '@/shadcn/shared/skelton-loader';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { StatusIndicator } from '@/shadcn/shared/status-indicator';



// Define the User interface based on the new API response
interface UserListTableProps {
  isError: boolean;
  isLoading: boolean;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      any,
      (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions: object
      ) => Promise<
        QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
      >,
      never,
      any,
      'usersApi'
    >
  >;
}

const UserListTable = ({ isError, refetch, isLoading }: UserListTableProps) => {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user?.users);

  if (isLoading) {
    return (
      <SkeletonLoader
        count={4}
        height='h-[10vh]'
        width='w-[100%]'
        className='!flex-col !gap-4'
      />
    );
  }

  if (isError) {
    return <FetchError refetch={refetch} />;
  }

  return (
    <div className='rounded-md border border-gray-200 bg-white'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow className='bg-gray-50 border-b border-gray-200'>
              <TableHead className='cursor-pointer hover:bg-gray-100 transition-colors w-[20%] min-w-[120px] text-gray-700 font-medium'>
                <div className='flex items-center space-x-1'>
                  <span>Name</span>
                </div>
              </TableHead>
              <TableHead className='cursor-pointer hover:bg-gray-100 transition-colors w-[20%] min-w-[180px] text-gray-700 font-medium'>
                <div className='flex items-center space-x-1'>
                  <span>Email</span>
                </div>
              </TableHead>
              <TableHead className='min-w-[80px] text-gray-700 font-medium'>
                Role
              </TableHead>
              <TableHead className='pl-8 min-w-[150px] text-gray-700 font-medium'>
                Email Verified
              </TableHead>
              <TableHead className='min-w-[100px] text-gray-700 font-medium'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: User) => (
              <TableRow
                key={user?.id}
                className='hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/users/${user?.id}`);
                }}
              >
                <TableCell className='font-medium pl-4 w-[20%] text-gray-900'>
                  <div className='truncate'>
                    {user?.firstName} {user?.lastName}
                  </div>
                </TableCell>
                <TableCell className='w-[25%] text-gray-700'>
                  <div className='truncate'>{user?.email}</div>
                </TableCell>
                <TableCell className='capitalize w-[17%] text-gray-700'>
                  {user?.role}
                </TableCell>
                <TableCell className='w-[19%] pl-8'>
                  <StatusIndicator
                    status={user?.isEmailVerified ? 'active' : 'inactive'}
                  />
                </TableCell>
                <TableCell>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0 hover:bg-gray-100'
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className='h-4 w-4 text-gray-600' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='end'
                        className='bg-white border-gray-200'
                      >
                        <DropdownMenuLabel className='text-gray-700'>
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className='bg-gray-200' />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserListTable;
