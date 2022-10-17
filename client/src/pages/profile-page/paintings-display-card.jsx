import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Image, TypographyLimited } from '../../components';

const PaintingsDisplayCard = ({
  title,
  img,
  description,
  price,
  size,
}) => (
  <Card sx={{
    display: 'flex', flexDirection: 'column', height: '100%', p: 1,
  }}
  >
    <Box sx={{ position: 'relative', width: '100%', pt: '95%' }}>
      <Image src={img} sx={{ position: 'absolute', top: 0, left: 0 }} />
    </Box>
    <CardContent sx={{ p: 2, flexGrow: 1 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
      }}
      >
        <Typography variant="h5" component="div" sx={{ mr: 2 }}>
          {title}
          {' '}
          {size}
        </Typography>

      </Box>
      <TypographyLimited variant="body2" color="text.secondary">{description}</TypographyLimited>
      <Typography variant="h5" component="div" sx={{ mt: 2 }}>
        {price}
        {' '}
        EUR
      </Typography>
    </CardContent>
    <CardActions sx={{ pb: 2, alignSelf: 'center' }}>

      <Box sx={{ display: 'flex', ml: 1 }} />

    </CardActions>
  </Card>
);

export default PaintingsDisplayCard;
