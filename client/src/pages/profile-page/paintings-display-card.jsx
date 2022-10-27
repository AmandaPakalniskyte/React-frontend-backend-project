import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions, IconButton,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Image, TypographyLimited } from '../../components';

const PaintingsDisplayCard = ({
  title,
  author,
  img,
  description,
  price,
  category,
  onEdit,
  onDelete,
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
        flexDirection: 'column',
        mb: 2,
      }}
      >
        <Typography>
          Pavadinimas:
          {' '}
          {title}
        </Typography>
        <Typography>
          Autorius:
          {' '}
          {author}
        </Typography>
        <Typography>
          Kategorija:
          {' '}
          {category}
        </Typography>
        <Typography>
          Kaina:
          {' '}
          {price}
          {' '}
          EUR
        </Typography>
      </Box>
      <TypographyLimited variant="body2" color="text.secondary">
        {description}
      </TypographyLimited>
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton
            sx={(theme) => ({ color: theme.palette.common.black })}
            size="large"
            onClick={onEdit}
          >
            <ModeEditIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton
            sx={(theme) => ({ color: theme.palette.common.black })}
            size="large"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ pb: 2, alignSelf: 'center' }}>
      <Box sx={{ display: 'flex', ml: 1 }} />
    </CardActions>
  </Card>
);

export default PaintingsDisplayCard;
