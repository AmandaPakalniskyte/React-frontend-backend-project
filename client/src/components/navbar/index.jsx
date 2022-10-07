import * as React from 'react';
import {
  Badge,
  AppBar,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  CardMedia,
  // Typography,
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import * as Nav from './components';
import CartContext from '../../contexts/cart-context';
import useAuth from '../../hooks/useAuth';

const links = [
  { text: 'PAGRINDINIS', to: '/' },
  { text: 'KONCEPTAS', to: '/concept' },
  { text: 'PAVEIKSLŲ GALERIJA', to: '/gallery' },
  // { text: 'PRISIJUNGTI', to: '/login' },
  // { text: 'REGISTRUOTIS', to: '/register' },
];

const expandBr = 'xl';

const Navbar = () => {
  const { cartItemsCount } = React.useContext(CartContext);
  const navigate = useNavigate();
  const isContracted = useMediaQuery((theme) => theme.breakpoints.down(expandBr));
  const [open, setOpen] = React.useState(false);
  const { loggedIn } = useAuth();

  React.useEffect(() => {
    if (!isContracted && open) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContracted]);

  return (
    <AppBar elevation={0} position="fixed">
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
      <Box sx={(theme) => theme.mixins.navbar}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ display: { [expandBr]: 'none' } }}
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Box sx={{
          display: { xs: 'none', [expandBr]: 'flex' },
          alignSelf: 'stretch',
        }}
        >
          {links.map(({ text, to }) => <Nav.Link key={to} to={to}>{text}</Nav.Link>)}
          {loggedIn ? (
            <Box>Profilis</Box>
          ) : (
            <>

              <Nav.Link to="/login" onClick={() => setOpen(false)}>PRISIJUNGTI</Nav.Link>
              <Nav.Link to="/register" onClick={() => setOpen(false)}>REGISTRUOTIS</Nav.Link>
            </>
          )}
        </Box>

        {isContracted && (
        <Drawer
          anchor="top"
          open={open}
        >
          <Box sx={(theme) => ({
            ...theme.mixins.toolbarOffset,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            mt: 10,
            backgroundColor: 'common.white',
          })}
          >
            {links.map(({ text, to }) => (
              <Nav.Link
                key={to}
                to={to}
                contracted
                onClick={() => setOpen(false)}
              >
                {text}
              </Nav.Link>
            ))}
            {loggedIn ? (
              <Box>Profilis</Box>
            ) : (
              <>

                <Nav.Link to="/login" onClick={() => setOpen(false)}>PRISIJUNGTI</Nav.Link>
                <Nav.Link to="/register" onClick={() => setOpen(false)}>REGISTRUOTIS</Nav.Link>
              </>
            )}
          </Box>
          <Box color="white">labas</Box>
        </Drawer>
        )}
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={() => navigate('/favourites')}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={() => navigate('/order')}
          >
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
