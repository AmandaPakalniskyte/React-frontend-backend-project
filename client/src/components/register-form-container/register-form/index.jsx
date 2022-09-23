import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { useFormik } from 'formik';

const RegisterForm = ({ children }) => {
  const onSubmit = (values) => {
    console.log('įvestos reikšmės');
    console.table(values);
  };

  const {
    dirty, isValid, handleSubmit,
  } = useFormik({
    onSubmit,
  });

  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        mt: 2,
        p: 5,
        // width: 450,
        width: {
          xl: '600px',
          lg: '500px',
          md: '100%',
          sm: '100%',
          xs: '100%',
        },
        mx: 'auto',
        background: theme.palette.common.white,
        color: theme.palette.primary.main,
      })}
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
        disabled={!dirty || !isValid}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default RegisterForm;
