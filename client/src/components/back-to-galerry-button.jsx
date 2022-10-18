import * as React from 'react';
import { Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const StyledButton = styled(Button)(() => ({

  ':hover': {
    backgroundColor: 'white',
    color: 'black',
  },

}));

const BackToGalleryButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      width="100%"
      size="large"
      variant="contained"
      onClick={() => navigate('/gallery')}
      sx={(theme) => ({
        color: theme.palette.primary.main,
        background: theme.palette.common.white,
      })}
    >
      <ArrowBackIosIcon />
      Grįžti į galeriją
    </StyledButton>
  );
};

export default BackToGalleryButton;
