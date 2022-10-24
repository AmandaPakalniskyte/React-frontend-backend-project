import * as React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoSection from './components/logo-section';
import * as Nav from './components';
import useAuth from '../../hooks/useAuth';
import IconSection from './components/icons-section';

const links = [
  { text: 'PAGRINDINIS', to: '/' },
  { text: 'KONCEPTAS', to: '/concept' },
  { text: 'PAVEIKSLŲ GALERIJA', to: '/gallery' },
];

const expandBr = 'xl';

const Navbar = () => {
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
      <LogoSection />
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
        <IconSection />
      </Box>
    </AppBar>
  );
};

export default Navbar;
