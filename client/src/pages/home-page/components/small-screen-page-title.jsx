import * as React from 'react';
import { Box, Typography } from '@mui/material';

const pageTitleWords = [
  { word: 'PAVEIKSLŲ' },
  { word: 'REPRODUKCIJŲ' },
  { word: 'GALERIJA' },
];

const SmallScreenPageTitle = () => (

  <Box mb={5}>
    {pageTitleWords.map(({ word }) => (
      <Typography sx={(theme) => ({
        typography: { md: 'h3', sm: 'h4', xs: 'h4' },
        display:
    {
      xl: 'none',
      lg: 'none',
      md: 'block',
      sm: 'block',
      xs: 'block',
    },
        textAlign: 'right',
        color: theme.palette.common.white,
      })}
      >
        {word}
      </Typography>
    ))}
  </Box>
);

export default SmallScreenPageTitle;
