import React from 'react';
import { Box, CardMedia } from '@mui/material';

const LogoSection = () => (
  <Box
    position="absolute"
    sx={{
      width: {
        lg: '200px',
        md: '200px',
        sm: '200px',
        xs: '180px',
      },
    }}
    mt={2}
    ml={3}
  >
    {' '}
    <CardMedia
      width="100%"
      component="img"
      image="/logo6.png"
      alt="green iguana"
      background="black"
    />
  </Box>
);

export default LogoSection;
