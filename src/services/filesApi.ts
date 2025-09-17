import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Namespace } from '../const';
import type { UploadFileQuery, UploadedFile } from '../types/types';
import { getToken } from '../utils/utils';

export const filesApi = createApi({
  reducerPath: Namespace.FilesAPI,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      headers.set('Authorization', `Bearer ${getToken()}`);

      return headers;
    },
  }),
  endpoints: (build) => ({
    uploadFile: build.mutation<UploadedFile, UploadFileQuery>({
      query: (user) => {
        return {
          url: 'files/upload',
          body: user,
          method: 'POST',
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = filesApi;
