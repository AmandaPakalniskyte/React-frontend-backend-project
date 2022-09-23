import * as React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BackToGalleryButton = () => {
  const navigate = useNavigate();

  return (
    <Button
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
    </Button>
  );
};

export default BackToGalleryButton;
