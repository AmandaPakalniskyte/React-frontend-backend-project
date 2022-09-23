import * as React from 'react';
import {
  Box,
} from '@mui/material';

const RegisterFormContainer = ({ children }) => (
  <Box sx={() => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    py: 8,
    px: 10,
  })}
  >
    {children}

  </Box>
);

export default RegisterFormContainer;
