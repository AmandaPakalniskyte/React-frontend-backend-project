import * as React from 'react';
import { Box } from '@mui/material';
import ListSection from './components/list-section';

const OrderPage = () => (
  <Box sx={() => ({
    display: 'flex',
    flexDirection: 'column',
    py: {
      lg: 10,
      md: 10,
      sm: 10,
      xs: 5,
    },
    px: {
      lg: 10,
      md: 10,
      sm: 10,
      xs: 5,
    },
  })}
  >
    <ListSection />
  </Box>
);

export default OrderPage;
