import {  CalendarDays, Calendar, ClipboardMinus,  FolderKanban,  LayoutDashboard, Pyramid,Timer, Users } from "lucide-react";

export const dashboardData = {
  user: {
    name: 'Yash Diwaker',
    email: 'yashdiwaker74@gmial.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    // {
    //   title: 'timeSheet',
    //   url: '#',
    //   icon: CalendarDays,
    //   isActive: true,
    // },
    {
      title: 'timeTracker',
      url: '/time-tracking',
      icon: Timer,
    },
    {
      title: 'dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
  ],
  projects: [
    {
      name: 'client',
      url: '/clients/list',
      icon: Pyramid,
      items: [],
    },
    {
      name: 'project',
      url: '/projects/list',
      icon: FolderKanban,
      items: [],
    },
    {
      name: 'users',
      url: '/users/list',
      icon: Users,
      items: [],
    },
    {
      name: 'my_documents',
      url: '/documents',
      icon: ClipboardMinus,
      items: [],
    },
  ],
};
