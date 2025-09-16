import { Button, Typography } from '@mui/material';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import { useMutationAction } from '../../../hooks/hooks';
import type { UploadFileQuery, UploadedFile } from '../../../types/types';
import { useUploadFileMutation } from '../../../services/filesApi';
import FilesList from '../FilesList/FilesList';
import Loader from '../../ui/Loader/Loader';
import MessageDialog from '../../ui/MessageDialog/MessageDialog';

export default function FileManager(): ReactElement {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogDescription, setDialogDescription] = useState<string>('');

  const [tryToUploadFile, { isLoading }] = useMutationAction<
    UploadedFile,
    UploadFileQuery
  >({
    mutation: useUploadFileMutation,
    onSuccess: () => {
      setDialogTitle('Document uploaded!');
      setDialogDescription(
        'Document successfully downloaded! The full list of your documents is available on the main page.'
      );
    },
    onError: () => {
      setDialogTitle('Upload failed!');
      setDialogDescription(
        'An error occurred while uploading the document. Please try again.'
      );
    },
    onFinally: () => {
      setIsDialogOpen(true);
    },
  });

  const onFileUpload = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.files) {
      const file = evt.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      tryToUploadFile(formData);
    }
  };

  const onAlertClose = (): void => {
    setIsDialogOpen(false);
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

      <MessageDialog
        title={dialogTitle}
        isDialogOpen={isDialogOpen}
        description={dialogDescription}
        onClose={onAlertClose}
      />

      {isLoading && <Loader isAction />}
    </>
  );
}
