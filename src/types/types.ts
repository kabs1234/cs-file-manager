import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import type {
  TypedUseMutation,
  TypedUseMutationResult,
} from '@reduxjs/toolkit/query/react';

export type LoginUserQuery = {
  email: string;
  password: string;
};

export type LoginUserQueryResult = {
  access_token: string;
  refresh_token: string;
};

export type UploadFileQuery = FormData;

export type UploadedFile = {
  originalname: string;
  filename: string;
  location: string;
};

export type UploadedFiles = UploadedFile[];

export type BaseQueryType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>;

export type MutationType<ResultType, QueryArg> = TypedUseMutation<
  ResultType,
  QueryArg,
  BaseQueryType
>;

export type MutationResultType<ResultType, QueryArg> = TypedUseMutationResult<
  ResultType,
  QueryArg,
  BaseQueryType
>;
