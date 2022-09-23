import * as React from 'react';
import {
  Box,
} from '@mui/material';

const Img = () => (

  <Box
    sx={{
      height: {
        lg: '350px',
        md: '350px',
        sm: '250px',
        xs: '250px',
      },
      width: {
        lg: '550px',
        md: '550px',
        sm: '450px',
        xs: '320px',
      },
    }}
    component="img"
    src="/palms2.jpg"
    position="relative"
  />
);

export default Img;
