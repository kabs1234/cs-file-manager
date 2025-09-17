import { Button, Typography } from '@mui/material';
import { useState, type ChangeEvent, type ReactElement } from 'react';
import { useMutationAction } from '../../../hooks/hooks';
import type { UploadFileQuery, UploadedFile } from '../../../types/types';
import { useUploadFileMutation } from '../../../services/filesApi';
import FilesList from '../FilesList/FilesList';
import Loader from '../../ui/Loader/Loader';
import MessageDialog from '../MessageDialog/MessageDialog';
import LogoutDialog from '../LogoutDialog/LogoutDialog';

export default function FileManager(): ReactElement {
  const [isMessageDialogOpen, setIsMessageDialogOpen] =
    useState<boolean>(false);
  const [messageDialogTitle, setMessageDialogTitle] = useState<string>('');
  const [messageDialogDescription, setMessageDialogDescription] =
    useState<string>('');

  const [tryToUploadFile, { isLoading }] = useMutationAction<
    UploadedFile,
    UploadFileQuery
  >({
    mutation: useUploadFileMutation,
    onSuccess: () => {
      setMessageDialogTitle('Document uploaded!');
      setMessageDialogDescription(
        'Document successfully downloaded! The full list of your documents is available on the main page.'
      );
    },
    onError: () => {
      setMessageDialogTitle('Upload failed!');
      setMessageDialogDescription(
        'An error occurred while uploading the document. Please try again.'
      );
    },
    onFinally: () => {
      setIsMessageDialogOpen(true);
    },
  });

  const onFileUpload = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.files) {
      const file = evt.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      tryToUploadFile(formData);

      evt.target.value = '';
    }
  };

  const onMessageDialogClose = (): void => {
    setIsMessageDialogOpen(false);
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

      <LogoutDialog />

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
        title={messageDialogTitle}
        isDialogOpen={isMessageDialogOpen}
        description={messageDialogDescription}
        onDialogClose={onMessageDialogClose}
      />

      {isLoading && <Loader isAction />}
    </>
  );
}
