/* eslint-disable no-use-before-define */
import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthService from '../../services/auth-service';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string()
    .required('Privaloma')
    .email('Neteisingas el. pašto formatas'),
  password: yup.string()
    .required('Privaloma')
    .min(8, 'Mažiausiai 8 simboliai')
    .matches(/[a-z]/, 'Bent viena mažoji raidė')
    .matches(/[A-Z]/, 'Bent viena didžioji raidė')
    .matches(/\d/, 'Bent vienas skaičius')
    .matches(/\W/, 'Bent vienas specialus simbolis'),
});

const LoginPage = () => {
  const [authError, setAuthError] = React.useState(null);

  const onSubmitRef = React.useRef(async (credentials) => {
    setAuthError(null);
    try {
      const authData = await AuthService.login(credentials);

      console.log(authData);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      resetForm();
    }
  });

  const {
    dirty, values, errors, touched, isValid,
    handleChange, handleBlur, handleSubmit, resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitRef.current,
  });

  return (
    <Box sx={() => ({
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '20px',
      py: {
        lg: 10,
        md: 10,
        sm: 5,
        xs: 5,
      },
      px: {
        lg: 10,
        md: 10,
        sm: 3,
        xs: 3,
      },
    })}
    >
      {authError
      && (
      <Alert
        severity="error"
        onClose={() => setAuthError(null)}
      >
        {authError}

      </Alert>
      )}
      <Paper sx={{
        p: 5,
        height: '400px',
        width: {
          lg: '500px',
          md: '500px',
          sm: '100%',
          xs: '100%',
        },
      }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
          onSubmit={handleSubmit}
        >
          <Typography component="h1" variant="h4">Prisijungimas</Typography>
          <TextField
            name="email"
            label="El. paštas"
            type="email"
            variant="filled"
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            name="password"
            label="Slaptažodis"
            type="password"
            variant="filled"
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!dirty || !isValid}
          >
            Prisijungti
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
