import { z } from 'zod';

export interface userStatusFilter {
  value: 'All' | 'Active' | 'Pending' | 'Inactive';
}



export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}


export const profileSchema = z.object({
  first_name: z.string().min(2, {
    message: 'Name is required',
  }),
  last_name: z.string().min(2, {
    message: 'Last name is required',
  }),
  email: z.string().email({
    message: 'Please enter a valid work email address.',
  }),
  role: z.string(),
  language: z.string(),
  designation: z.string().optional(),
});
