import * as React from 'react';
import {
  styled, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(() => ({

  ':hover': {
    transform: 'scale(1.2)',
    backgroundColor: 'white',
    color: 'black',
  },
}));

const BackToCartButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      width="100%"
      size="large"
      variant="contained"
      onClick={() => navigate('/order')}
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
      })}
    >
      Grįžti į krepželį
    </StyledButton>
  );
};

export default BackToCartButton;
