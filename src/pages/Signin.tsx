import { Box, Button, TextField, Typography } from '@mui/material';
import AppBar from '../components/AppBar';
import routes from './routes';
import Wrapper from '../components/Wrapper';
import formErrorMessages from '../utils/formErrorMessages';
import { useForm } from 'react-hook-form';
import { auth } from '../db/initFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  return (
    <>
      <AppBar title="Signin" linkBackTo={routes.home} />
      <Wrapper>
        <Typography variant="h4">Sign in</Typography>
        <Box mt={6}>
          <form
            onSubmit={handleSubmit((vals) => {
              createUserWithEmailAndPassword(auth, vals.email, vals.password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log('LOGGED ');
                  console.log(user);
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                });
              reset();
            })}
          >
            <TextField
              label="Enter email"
              variant="outlined"
              fullWidth
              {...register('email', {
                required: formErrorMessages.required,
              })}
              error={!!errors.email}
              helperText={errors.email?.message || ' '}
            />
            <TextField
              label="Enter password"
              variant="outlined"
              fullWidth
              {...register('password', {
                required: formErrorMessages.required,
              })}
              error={!!errors.password}
              helperText={errors.password?.message || ' '}
            />
            <Button type="submit" color="primary">
              SIGN UP
            </Button>
          </form>
        </Box>
      </Wrapper>
    </>
  );
};

export default Signin;
