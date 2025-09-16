import { Button, FormGroup, TextField } from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import { useState, type ReactElement } from 'react';
import { useMutationAction } from '../../../hooks/hooks';
import { useLoginUserMutation } from '../../../services/authorizationApi';
import type {
  LoginUserQueryResult,
  LoginUserQuery,
} from '../../../types/types';

export default function LoginForm(): ReactElement {
  const [email, setEmail] = useState<string>('john@mail.com');
  const [password, setPassword] = useState<string>('changeme');

  const onEmailInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setEmail(evt.target.value);
  };

  const onPasswordInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setPassword(evt.target.value);
  };

  const [tryToLoginUser] = useMutationAction<
    LoginUserQueryResult,
    LoginUserQuery
  >({
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
