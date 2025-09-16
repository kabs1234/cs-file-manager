import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import type { ReactElement } from 'react';

export default function MessageDialog({
  isDialogOpen,
  onClose,
  title,
  description,
}: {
  isDialogOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}): ReactElement {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      aria-labelledby="message-dialog-title"
      aria-describedby="message-dialog-description"
    >
      <DialogTitle id="message-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="message-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
