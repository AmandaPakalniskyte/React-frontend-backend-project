import * as React from 'react';
import { Box, Typography } from '@mui/material';

const BottomDescription = () => (

  <Box
    position="absolute"
    sx={(theme) => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      p: {
        lg: 5,
        md: 5,
        sm: 4,
        xs: 4,
      },
      top: {
        lg: 65,
        md: 65,
        sm: 35,
        xs: 35,
      },
      left: {
        lg: '40%',
        md: '20%',
        sm: '0%',
        xs: '0%',
      },
      height: {
        lg: '220px',
        md: '220px',
        sm: '180px',
        xs: '180px',
      },
      width: {
        lg: '500px',
        md: '500px',
        sm: '400px',
        xs: '320px',
      },
    })}
  >
    <Typography
      component="h2"
      variant="h6"
      sx={() => ({
        mb: 2,
        fontSize: {
          lg: 16,
          md: 16,
          sm: 13,
          xs: 13,
        },
      })}
    >
      GALERIJOS ISTORIJA
    </Typography>
    <Typography sx={() => ({
      fontSize: {
        lg: 16,
        md: 16,
        sm: 13,
        xs: 13,
      },
    })}
    >
      Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Delectus
      architecto illum perferendis mollitia a ducimus
      minima unde esse nostrum quae voluptates voluptatem
    </Typography>
  </Box>
);
export default BottomDescription;
