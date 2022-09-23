import * as React from 'react';
import { Box } from '@mui/material';

const BackgroundBox = ({ children }) => (
  <Box sx={(theme) => ({
    height: '100%',
    py: {
      lg: '60px',
      md: '60px',
      sm: '30px',
      xs: '30px',
    },
    px: {
      lg: '40px',
      md: '40px',
      sm: '20px',
      xs: '20px',
    },
    width: {
      lg: '60vw',
      md: '70vw',
      sm: '80vw',
      xs: '85vw',
    },
    mx: 'auto',
    background: theme.palette.common.white,
    borderRadius: 1,
    position: 'relative',
  })}
  >
    {children}
  </Box>
);

export default BackgroundBox;
