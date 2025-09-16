import { DialogActions, Button } from '@mui/material';
import { useState, type ReactElement } from 'react';
import CustomDialog from '../../ui/CustomDialog/CustomDialog';
import { useAppDispatch } from '../../../app/hooks';
import {
  resetFiles,
  setAccessToken,
} from '../../../slices/filesSlice/files.slice';
import { removeToken } from '../../../utils/utils';

export default function LogoutDialog(): ReactElement {
  const dispatch = useAppDispatch();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);

  const onLogoutButtonClick = (): void => {
    setIsLogoutDialogOpen(true);
  };

  const onLogoutDialogClose = (): void => {
    setIsLogoutDialogOpen(false);
  };

  const onUserLogout = (): void => {
    dispatch(setAccessToken(null));
    dispatch(resetFiles());
    removeToken();
  };

  return (
    <>
      <Button
        onClick={onLogoutButtonClick}
        variant="contained"
        sx={{
          display: 'block',
          marginBottom: '20px',
          width: '100%',
        }}
      >
        Logout
      </Button>

      <CustomDialog
        isDialogOpen={isLogoutDialogOpen}
        onDialogClose={onLogoutDialogClose}
        title="Do you want to logout?"
      >
        <DialogActions>
          <Button onClick={onLogoutDialogClose}>No</Button>
          <Button onClick={onUserLogout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
}
