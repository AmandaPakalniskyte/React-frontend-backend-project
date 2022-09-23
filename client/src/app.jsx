import * as React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CartProvider } from './contexts/cart-context';
import { FavouritesProvider } from './contexts/favourites-context';
import PageRoutes from './routes/page-routes';

const App = () => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <BrowserRouter>
      <CartProvider>
        <FavouritesProvider>
          <PageRoutes />
        </FavouritesProvider>
      </CartProvider>
    </BrowserRouter>
  </LocalizationProvider>
);

export default App;
