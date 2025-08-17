import {
  fetchBaseQuery,
  BaseQueryApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { logout, setUser } from '@/modules/auth/auth-slice';
import { BASE_URL } from './constats';
import { IAuthResponse } from '@/modules/auth/models';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token?.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  credentials: 'include',
});

/**
 * A base query function that handles token refresh on 401 unauthorized errors.
 *
 * If a request returns a 401 status, this function attempts to refresh the access token using the refresh token.
 * If successful, it updates the tokens in the state and retries the original request. If unsuccessful, it logs the user out.
 *
 * @param {string | FetchArgs} args - The arguments for the fetch request, which can be a URL string or an object containing the request parameters.
 * @param {BaseQueryApi} api - The API object provided by RTK Query, containing utilities such as `dispatch` and `getState`.
 * @param {object} extraOptions - Additional options for the fetch request.
 * @returns {Promise<object>} The result of the fetch request, potentially with a refreshed token.
 */

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  if (typeof args !== 'string' && args.body instanceof FormData) {
    if (args.headers) {
      delete (args.headers as Record<string, string>)['Content-Type'];
    } else {
      args.headers = {};
    }
  } else if (typeof args !== 'string') {
    args.headers = {
      ...args.headers,
      'Content-Type': 'application/json',
    };
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Unauthorized request! Refreshing token...');

    const refreshResult: any = await baseQuery(
      {
        url: '/users/auth/refresh/',
        method: 'POST',
        body: {
          refresh_token: (api.getState() as RootState).auth.token?.refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const accessToken = refreshResult?.data?.data[0];

      const user = (api.getState() as RootState).auth?.user;
      const refreshToken = (api.getState() as RootState).auth.token
        ?.refreshToken;

      const updatedCredentials: IAuthResponse = {
        user: {
                userId: user?.userId || '',
                email: user?.email || '',
                firstName: user?.firstName || '',
                role: user?.role || '',
                lastName: user?.lastName || '',
                profileImage: user?.profileImage || '',
        },
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken as string,
        },
      };

      api.dispatch(setUser(updatedCredentials));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
