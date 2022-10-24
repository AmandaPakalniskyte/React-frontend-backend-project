import React from 'react';
import { Box } from '@mui/material';

const ProfileInfoAndCreateProductSection = ({ children }) => (
  <Box
    height="100%"
    width="100%"
    display="flex"
    sx={() => ({
      flexDirection: {
        xl: 'row',
        lg: 'column',
        md: 'column',
        sm: 'column',
        xs: 'column',
      },
      justifyContent: {
        xl: 'space-around',
        lg: 'center',
        md: 'center',
        sm: 'center',
        xs: 'center',
      },
      alignItems: {
        xl: 'stretch',
        lg: 'center',
        md: 'center',
        sm: 'center',
        xs: 'center',
      },
      gap: {
        xl: 0,
        lg: 5,
        md: 5,
        sm: 5,
        xs: 5,
      },
    })}
  >
    {children}

  </Box>
);

export default ProfileInfoAndCreateProductSection;
