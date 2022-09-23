import React from 'react';
import {
  Button,
  Box,
  Typography,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackToGalleryButton from '../../../../../components/back-to-galerry-button';

const StyledButton = styled(Button)(() => ({

  ':hover': {
    transform: 'scale(1.2)',
    backgroundColor: 'white',
    color: 'black',
  },

}));

const navigationButtons = [
  { buttonTitle: 'Pirkti prisijungus', link: '/login' },
  { buttonTitle: 'Registruotis ir pirkti', link: '/register' },
  { buttonTitle: 'Pirkti kaip svečiui', link: '/contact' },
];

const TotalSection = ({ total }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mt: 3,
    }}
    >
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
      >
        <Box sx={() => ({
          display: {
            xl: 'flex',
            lg: 'flex',
            md: 'flex',
            sm: 'none',
            xs: 'none',
          },
        })}
        >
          {' '}
          <BackToGalleryButton />

        </Box>

        {total > 0 && (
        <Box sx={{
          display: 'flex',
        }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography
              variant="h6"
              sx={(theme) => ({ color: theme.palette.common.white, fontWeight: 'bold' })}
            >
              Suma:
              {' '}
              {`${total.toFixed(2)} EUR`}
            </Typography>

            {navigationButtons.map(({ buttonTitle, link }) => (
              <StyledButton
                width="100%"
                size="large"
                variant="contained"
                onClick={() => navigate(link)}
                sx={(theme) => ({
                  backgroundColor: theme.palette.common.white,
                  color: theme.palette.primary.main,
                })}
              >
                {buttonTitle}
              </StyledButton>
            ))}
            <Box sx={() => ({
              display: {
                xl: 'none',
                lg: 'none',
                md: 'none',
                sm: 'flex',
                xs: 'flex',
              },
            })}
            >
              {' '}
              <BackToGalleryButton />

            </Box>
          </Box>
        </Box>
        )}
      </Box>
    </Box>
  );
};

export default TotalSection;
