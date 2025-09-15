import { Button, FormGroup, TextField } from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import { useState, type ReactElement } from 'react';
import { useMutationAction } from '../../hooks/hooks';
import type { LoginUserQuery, LoginUserResult } from '../../types/types';
import { useLoginUserMutation } from '../../services/authorizationApi';

export default function LoginPage(): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onEmailInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setEmail(evt.currentTarget.value);
  };

  const onPasswordInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.currentTarget.value);
  };

  const [tryToLoginUser] = useMutationAction<LoginUserResult, LoginUserQuery>({
    mutation: useLoginUserMutation,
  });

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    tryToLoginUser({
      email: email,
      password: password,
    });
  };

  return (
    <>
      <h1>Login Page</h1>

      <form onSubmit={onFormSubmit}>
        <FormGroup>
          <TextField
            type="email"
            value={email}
            slotProps={{
              htmlInput: {
                onInput: onEmailInput,
              },
            }}
            sx={{
              marginBottom: '20px',
            }}
          />

          <TextField
            type="password"
            value={password}
            slotProps={{
              htmlInput: {
                onInput: onPasswordInput,
              },
            }}
            sx={{
              marginBottom: '20px',
            }}
          />

          <Button type="submit">login</Button>
        </FormGroup>
      </form>
    </>
  );
}
