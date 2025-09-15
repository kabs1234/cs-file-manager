import { Button } from '@mui/material';
import type { ReactElement } from 'react';

export default function FileManager(): ReactElement {
  return (
    <>
      <h1>File manager</h1>

      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
    </>
  );
}
