import { createSlice } from '@reduxjs/toolkit';
import type { File } from 'buffer';
import { Namespace } from '../../const';

type FileSlice = {
  files: File[];
};

const initialState: FileSlice = {
  files: [],
};

export const filesSlice = createSlice({
  initialState,
  name: Namespace.Files,
  reducers: {},
});
