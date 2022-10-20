import * as React from 'react';
import {
  Badge,
  AppBar,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  CardMedia,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import * as Nav from './components';
import CartContext from '../../contexts/cart-context';
import useAuth from '../../hooks/useAuth';
import { authLogoutAction } from '../../store/auth/auth-actions';

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
  const { loggedIn, user, dispatch } = useAuth();
  const AuthMenuIconRef = React.useRef(null);
  const [authMenuOpen, setAuthMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isContracted && open) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContracted]);

  const userRole = localStorage.getItem('role');

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
          {!loggedIn && (
            <>

              <Nav.Link to="/auth/login" onClick={() => setOpen(false)}>PRISIJUNGTI</Nav.Link>
              <Nav.Link to="/auth/register" onClick={() => setOpen(false)}>REGISTRUOTIS</Nav.Link>
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
            <Box sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              color: theme.palette.primary.main,
            })}
            >
              {!loggedIn
              && (
              <>

                <Nav.Link
                  to="/auth/login"
                  sx={(theme) => ({
                    mt: 12,
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  })}
                  onClick={() => setOpen(false)}
                >
                  PRISIJUNGTI

                </Nav.Link>
                <Nav.Link
                  to="/auth/register"
                  sx={(theme) => ({
                    fontWeight: 600,
                    mt: 4,

                    color: theme.palette.primary.main,
                  })}
                  onClick={() => setOpen(false)}
                >
                  REGISTRUOTIS

                </Nav.Link>
              </>
              )}
            </Box>
          </Box>
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
          {loggedIn && (
            <>
              <IconButton
                ref={AuthMenuIconRef}
                onClick={() => setAuthMenuOpen(!authMenuOpen)}
              >
                <Avatar
                  src={user.img}
                  sx={(theme) => ({
                    alignSelf: 'center',
                    ml: 2,
                    width: 35,
                    height: 35,
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.common.white,
                  })}
                >
                  {user.firstName[0]}
                  {user.surname[0]}
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={AuthMenuIconRef.current}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={authMenuOpen}
                onClose={() => setAuthMenuOpen(false)}
              >
                <MenuItem
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    navigate(userRole === 'USER' ? '/user-profile' : '/profile');
                    setAuthMenuOpen(false);
                  }}
                >
                  <Typography textAlign="center">Profilis</Typography>
                  <AccountCircleIcon sx={{ ml: 2 }} />
                </MenuItem>
                <MenuItem
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    dispatch(authLogoutAction);
                    setAuthMenuOpen(false);
                    navigate('/auth/login');
                  }}
                >
                  <Typography textAlign="center">Atsijungti</Typography>
                  <LogoutIcon sx={{ ml: 2 }} />
                </MenuItem>
              </Menu>
            </>
          )}

        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
