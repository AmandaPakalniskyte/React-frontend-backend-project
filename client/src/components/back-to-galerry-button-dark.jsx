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

const BackToGalleryButtonLight = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      width="100%"
      size="large"
      variant="contained"
      onClick={() => navigate('/gallery')}
      sx={(theme) => ({
        color: theme.palette.common.white,
        background: theme.palette.primary.main,
      })}
    >
      <ArrowBackIosIcon />
      Grįžti į galeriją
    </StyledButton>
  );
};

export default BackToGalleryButtonLight;
