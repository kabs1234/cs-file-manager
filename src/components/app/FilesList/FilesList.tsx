import type { ReactElement } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { getFiles } from '../../../slices/filesSlice/files.selectors';
import { Link, List, ListItem } from '@mui/material';

export default function FilesList(): ReactElement {
  const files = useAppSelector(getFiles);

  if (files.length === 0) {
    return <p>Files list is empty. Try to upload some files!</p>;
  }

  return (
    <List
      sx={{
        '& .MuiListItem-root:not(:last-child)': {
          marginBottom: '20px',
        },
      }}
    >
      {files.map((file) => {
        return (
          <ListItem
            key={file.filename}
            sx={{
              border: '1px solid #000',
              flexDirection: 'column',
            }}
          >
            <p>{file.filename}</p>

            <Link
              href={file.location}
              download={file.filename}
              sx={{ width: '100%', wordWrap: 'break-word' }}
            >
              {file.location}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
}
