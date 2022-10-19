import * as React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { styled, useTheme } from '@mui/material';
import { CartProvider } from './contexts/cart-context';
import { FavouritesProvider } from './contexts/favourites-context';
import PageRoutes from './routes/page-routes';
import useAuth from './hooks/useAuth';

const delay = 700;

const LoadingBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  height: '100vh',
  width: '100vw',
  display: 'grid',
  placeItems: 'center',
  ...theme.typography.h1,
  color: theme.palette.common.white,
  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.loadingScreen,
    delay,
  }),
  backgroundColor: theme.palette.primary.main,
  opacity: 1,
  zIndex: 30000,

  '&.loaded': {
    opacity: 0,
  },
}));

const App = () => {
  const [animationEnded, setAnimationEnded] = React.useState(false);
  const { initialized } = useAuth();
  const theme = useTheme();

  React.useEffect(() => {
    if (!animationEnded && initialized) {
      setTimeout(() => {
        setAnimationEnded(true);
      }, theme.transitions.duration.loadingScreen + delay);
    }
  }, [animationEnded, initialized, theme.transitions.duration.loadingScreen]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {!animationEnded && (
      <LoadingBackground className={initialized && 'loaded'}>
        Kraunasi
      </LoadingBackground>
      )}
      {initialized && (
      <CartProvider>
        <BrowserRouter>

          <FavouritesProvider>
            <PageRoutes />
          </FavouritesProvider>

        </BrowserRouter>
      </CartProvider>
      )}
    </LocalizationProvider>
  );
};

export default App;
