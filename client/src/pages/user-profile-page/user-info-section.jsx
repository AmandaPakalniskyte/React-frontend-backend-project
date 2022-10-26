import React from 'react';
import { Box } from '@mui/material';

const UserInfoSection = ({ children }) => (
  <Box width="100%" display="flex" justifyContent="center">
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap={5}
      borderRadius={1}
      p={5}
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        width: {
          lg: '500px',
          md: '400px',
          sm: '400px',
          xs: '320px',
        },
      })}
    >
      {children}

    </Box>
  </Box>
);

export default UserInfoSection;
