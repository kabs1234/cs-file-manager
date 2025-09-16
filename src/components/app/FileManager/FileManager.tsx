import { Button, Typography } from '@mui/material';
import { type ChangeEvent, type ReactElement } from 'react';
import { useMutationAction } from '../../../hooks/hooks';
import type { UploadFileQuery, UploadedFile } from '../../../types/types';
import { useUploadFileMutation } from '../../../services/filesApi';
import FilesList from '../FilesList/FilesList';

export default function FileManager(): ReactElement {
  const [tryToUploadFile] = useMutationAction<UploadedFile, UploadFileQuery>({
    mutation: useUploadFileMutation,
  });

  const onFileUpload = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.files) {
      const file = evt.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      tryToUploadFile(formData);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          margin: '20px 0',
        }}
      >
        File manager
      </Typography>

      <Button
        variant="contained"
        component="label"
        sx={{
          marginBottom: '20px',
        }}
      >
        Upload File
        <input type="file" hidden onChange={onFileUpload} />
      </Button>

      <FilesList />
    </>
  );
}
