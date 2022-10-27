import React from 'react';
import {
  Badge,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../contexts/cart-context';
import useAuth from '../../../hooks/useAuth';
import { authLogoutAction } from '../../../store/auth/auth-actions';

const IconSection = () => {
  const { cartItemsCount } = React.useContext(CartContext);
  const navigate = useNavigate();
  const { loggedIn, user, dispatch } = useAuth();

  const AuthMenuIconRef = React.useRef(null);
  const [authMenuOpen, setAuthMenuOpen] = React.useState(false);

  const userRole = localStorage.getItem('role');
  const isAdmin = userRole === 'ADMIN';

  return (
    <Box>
      {(!isAdmin || !loggedIn) && (
        <>
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
        </>
      )}
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
  );
};

export default IconSection;
