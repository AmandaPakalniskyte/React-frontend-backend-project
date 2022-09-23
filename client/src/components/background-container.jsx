import * as React from 'react';
import { Box } from '@mui/material';

const BackgroundContainer = ({ children }) => (
  <Box
    py={8}
  >
    {children}
  </Box>
);

export default BackgroundContainer;
