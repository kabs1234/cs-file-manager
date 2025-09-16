import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import type { ReactElement } from 'react';
import CustomDialog from '../../ui/CustomDialog/CustomDialog';

export default function MessageDialog({
  isDialogOpen,
  onDialogClose,
  title,
  description,
}: {
  isDialogOpen: boolean;
  onDialogClose: () => void;
  title: string;
  description: string;
}): ReactElement {
  return (
    <CustomDialog
      title={title}
      onDialogClose={onDialogClose}
      isDialogOpen={isDialogOpen}
    >
      <DialogContent>
        <DialogContentText id="message-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}
