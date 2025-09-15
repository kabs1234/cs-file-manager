import { createSlice } from '@reduxjs/toolkit';
import type { File } from 'buffer';
import { Namespace } from '../../const';
import { getToken, setToken } from '../../utils/utils';
import { authorizationApi } from '../../services/authorizationApi';

type FileSlice = {
  accessToken: string | null;
  files: File[];
};

const initialState: FileSlice = {
  accessToken: getToken(),
  files: [],
};

export const filesSlice = createSlice({
  initialState,
  name: Namespace.Files,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authorizationApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        const accessToken = action.payload.access_token;

        state.accessToken = accessToken;
        setToken(accessToken);
      }
    );
  },
});
