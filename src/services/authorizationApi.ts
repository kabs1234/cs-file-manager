import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Namespace } from '../const';
import type { LoginUserQuery, LoginUserResult } from '../types/types';

export const authorizationApi = createApi({
  reducerPath: Namespace.Authorization,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    loginUser: build.mutation<LoginUserResult, LoginUserQuery>({
      query: (user) => {
        return {
          url: 'auth/login',
          body: user,
          method: 'POST',
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authorizationApi;
