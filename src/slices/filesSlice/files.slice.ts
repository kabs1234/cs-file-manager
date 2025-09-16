import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../const';
import { getToken, setToken } from '../../utils/utils';
import { authorizationApi } from '../../services/authorizationApi';
import { filesApi } from '../../services/filesApi';
import type { UploadedFiles } from '../../types/types';

type FileSlice = {
  accessToken: string | null;
  files: UploadedFiles;
};

const initialState: FileSlice = {
  accessToken: getToken(),
  files: [],
};

export const filesSlice = createSlice({
  initialState,
  name: Namespace.FilesSlice,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    resetFiles: (state) => {
      state.files = [];
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authorizationApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        const accessToken = action.payload.access_token;

        state.accessToken = accessToken;
        setToken(accessToken);
      }
    );
    builder.addMatcher(
      filesApi.endpoints.uploadFile.matchFulfilled,
      (state, action) => {
        const newFile = action.payload;
        const files = state.files;
        state.files = [...files, newFile];
      }
    );
  },
});

export const { setAccessToken, resetFiles } = filesSlice.actions;
