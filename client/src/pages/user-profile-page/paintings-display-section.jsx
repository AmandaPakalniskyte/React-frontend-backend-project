import * as React from 'react';
import { Box, Grid } from '@mui/material';
import PaintingsDisplayCard from './paintings-display-card';

const PaintingsDisplaySection = ({ paintings, handleUpdatePainting }) => (
  <Box sx={{
    display: 'flex', gap: { xs: 4, xl: 0 }, py: 3, px: 3,
  }}
  >
    <Grid container spacing={3}>
      {paintings.map(({
        id,
        title,
        author,
        description,
        img,
        price,
      }) => (
        <Grid key={id} item xs={12} sm={12} md={12} xl={4}>
          <PaintingsDisplayCard
            id={id}
            title={title}
            author={author}
            description={description}
            img={img}
            price={price}
            updatePainting={handleUpdatePainting}
          />

        </Grid>
      ))}
    </Grid>
  </Box>
);

export default PaintingsDisplaySection;
