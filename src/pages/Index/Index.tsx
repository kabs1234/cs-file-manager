import { type ReactElement } from 'react';
import FileManager from '../../components/app/FileManager/FileManager';
import LoginForm from '../../components/app/LoginForm/LoginForm';
import { useAppSelector } from '../../app/hooks';
import { getAccessToken } from '../../slices/filesSlice/files.selectors';

export default function IndexPage(): ReactElement {
  const isTokenSaved = useAppSelector(getAccessToken);

  if (!isTokenSaved) {
    return <LoginForm />;
  }

  return <FileManager />;
}
