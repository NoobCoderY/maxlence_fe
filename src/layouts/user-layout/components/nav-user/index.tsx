import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shadcn/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/modules/auth/auth-slice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <img
                className='h-8 w-8 rounded-lg object-cover border'
                crossOrigin='anonymous'
                src={
                  currentUser?.profileImage || 'https://github.com/shadcn.png'
                }
                alt={currentUser?.firstName || 'Anonymous'}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://github.com/shadcn.png';
                }}
              />
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {`${currentUser?.firstName} ${currentUser?.lastName}`}
                </span>
                <span className='truncate text-xs'>{currentUser?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg  !z-[100]'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <img
                  crossOrigin='anonymous'
                  className='h-8 w-8 rounded-lg object-cover border'
                  src={
                    currentUser?.profileImage || 'https://github.com/shadcn.png'
                  }
                  alt={currentUser?.firstName || 'Anonymous'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://github.com/shadcn.png';
                  }}
                />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {currentUser?.firstName || 'Anonymous'}
                  </span>
                  <span className='truncate text-xs'>{currentUser?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup></DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigate('/profile');
                }}
              >
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logoutUser();
              }}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
