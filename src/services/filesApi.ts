import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, Namespace } from '../const';
import type { UploadFileQuery, UploadedFile } from '../types/types';

export const filesApi = createApi({
  reducerPath: Namespace.FilesAPI,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
