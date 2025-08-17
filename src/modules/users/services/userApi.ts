import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'UserDetails'],
  endpoints: (builder) => ({
    listAllUsers: builder.query({
      query: ({ page, limit, search, sortBy, sortOrder }) => ({
        url: '/users/',
        method: 'GET',
        params: {
          page: page || 1,
          limit: limit || 10,
          search: search || '',
          sortBy: sortBy || 'createdAt',
          sortOrder: sortOrder || 'DESC',
        },
      }),
      providesTags: ['Users'],
    }),

    userDetails: builder.query({
      query: ({ userId }: { userId: string }) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { userId }) => [
        { type: 'UserDetails', id: userId },
      ],
    }),
    editUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        'Users',
        { type: 'UserDetails', id: userId },
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    updatePassword: builder.mutation({
      query: (data: {
        password: string;
        confirmPassword: string;
        uuid: string;
      }) => ({
        url: `/users/password-reset-confirm/${data.uuid}/`,
        method: 'POST',
        body: {
          new_password: data?.password,
          confirm_password: data?.confirmPassword,
        },
      }),
    }),
  }),
});

export const {
  useListAllUsersQuery,
  useUserDetailsQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
} = usersApi;
