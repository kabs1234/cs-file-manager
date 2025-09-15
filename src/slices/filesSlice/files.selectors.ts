import type { RootState } from '../../app/store';

export const getAccessToken = (state: RootState) => {
  return state.Files.accessToken;
};
