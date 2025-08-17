import * as React from 'react';
import { NavProjects } from '@/layouts/user-layout/components/nav-project';
import { NavUser } from '@/layouts/user-layout/components/nav-user';
import { NavLogo } from '@/layouts/user-layout/components/nav-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shadcn/components/ui/sidebar';
import { dashboardData as data } from '../../utils';


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='icon'
      {...props}
    >
      <SidebarHeader>
        <NavLogo  />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
