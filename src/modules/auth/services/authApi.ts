import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'authApi',
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/login/',
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
      }) => ({
        url: '/auth/signup/',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: {
        password: string;
        token: string;
      }) => ({
        url: `/auth/reset-password/`,
        method: 'POST',
        body: {
          token: data.token,
          password: data.password
        }
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: { email: string }) => ({
        url: '/auth/forgot-password/',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.query({
      query: (data: { token: string }) => ({
        url: `/auth/verify-email/?token=${data.token}`,
        method: 'GET',
      }),
    }),
    googleLogin: builder.query({
      query: (data: { idToken: string }) => ({
        url: '/oauth/google/',
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/users/profile/',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailQuery,
  useGoogleLoginQuery,
  useGetProfileQuery,
} = authApi;
