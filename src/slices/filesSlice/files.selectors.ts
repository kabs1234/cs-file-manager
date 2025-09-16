import type { RootState } from '../../app/store';

export const getAccessToken = (state: RootState) => {
  return state.FilesSlice.accessToken;
};

export const getFiles = (state: RootState) => {
  return state.FilesSlice.files;
};
