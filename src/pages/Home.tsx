import { Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import routes from './routes';
import Wrapper from '../components/Wrapper';
import AppBar from '../components/AppBar';
import { useForm } from 'react-hook-form';
import formErrorMessages from '../utils/formErrorMessages';
import { useState } from 'react';
import { auth } from '../db/initFirebase';
import Database from '../types/Database';

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();

  const [templates, setTemplates] = useState<Database.Template[]>([]);

  return (
    <>
      <AppBar
        title="Templatio"
        actions={
          auth.currentUser ? (
            <Typography>{auth.currentUser?.email}</Typography>
          ) : (
            <Button
              color="primary"
              size="small"
              component={Link}
              to={routes.signin}
              variant="contained"
            >
              Sign In
            </Button>
          )
        }
      />
      <Wrapper>
        <Box mt={6}>
          <Typography paragraph>Templates</Typography>
          <ul>
            {templates.map((todo) => (
              <li>{todo.description}</li>
            ))}
          </ul>
        </Box>
        <form
          onSubmit={handleSubmit((vals) => {
            setTemplates([
              ...templates,
              {
                id: vals.name,
                description: vals.name,
                name: vals.name,
              },
            ]);
            reset();
          })}
        >
          <TextField
            label="Enter template name"
            variant="outlined"
            fullWidth
            {...register('name', {
              required: formErrorMessages.required,
            })}
            error={!!errors.name}
            helperText={errors.name?.message || ' '}
          />
          <Button type="submit" color="primary">
            Add
          </Button>
        </form>
      </Wrapper>
    </>
  );
};

export default Home;
