import * as React from 'react';
import {
  Box, Typography,
} from '@mui/material';
import Img from './components/img';
import ImgReverse from './components/img-reverse';
import TopDescription from './components/top-description';
import BottomDescription from './components/bottom-description';
import SmallScreenPageTitle from './components/small-screen-page-title';

const HomePage = () => (
  <Box sx={() => ({
    display: 'flex',
    flexDirection: 'column',

    py: {
      xl: 10,
      lg: 3,
      md: 3,
      sm: 3,
      xs: 3,
    },
    px: {
      lg: 10,
      md: 10,
      sm: 4,
      xs: 4,
    },
  })}
  >
    <SmallScreenPageTitle />
    <Box>
      <Box position="relative">
        <Box>
          <Img />
          <TopDescription />
        </Box>
        <Box
          textAlign="right"
          color="white"
          position="absolute"
          sx={() => ({
            bottom: 0,
            right: 0,
            display:
          {
            xl: 'block',
            lg: 'block',
            md: 'none',
            sm: 'none',
            xs: 'none',
          },
          })}
        >
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>PAVEI</Typography>
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>KSLŲ</Typography>
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>REPRO</Typography>
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>DUKCIJŲ</Typography>
        </Box>
      </Box>
      <Box position="relative" display="flex" justifyContent="right" mt={6}>
        <ImgReverse />
        <BottomDescription />
        <Box
          textAlign="left"
          color="white"
          position="absolute"
          sx={() => ({
            top: 0,
            left: 0,
            display:
          {
            xl: 'block',
            lg: 'block',
            md: 'none',
            sm: 'none',
            xs: 'none',
          },
          })}
        >
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>GA</Typography>
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>LER</Typography>
          <Typography sx={{ typography: { xl: 'h1', lg: 'h2' } }}>IJA</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);
export default HomePage;
