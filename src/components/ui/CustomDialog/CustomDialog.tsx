import { Dialog, DialogTitle } from '@mui/material';
import { type PropsWithChildren, type ReactElement } from 'react';

type CustomDialogProps = PropsWithChildren<{
  isDialogOpen: boolean;
  onDialogClose: () => void;
  title: string;
}>;

export default function CustomDialog({
  isDialogOpen,
  onDialogClose,
  title,
  children,
}: CustomDialogProps): ReactElement {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      {children}
    </Dialog>
  );
}
