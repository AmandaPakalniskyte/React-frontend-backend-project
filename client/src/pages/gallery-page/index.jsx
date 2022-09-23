import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { GalleryCard, Filters } from './components';
import PaintingService from '../../services/painting-service';

const drawerWidth = 280;

const GalleryPage = () => {
  const [paintings, setPaintings] = React.useState([]);
  const [searchParams] = useSearchParams();

  const handleFetchPaintings = React.useCallback(async () => {
    const [fetchedPaintings] = await Promise.all([
      PaintingService.fetchAll(searchParams.toString()),
    ]);
    setPaintings(fetchedPaintings);
  }, [searchParams]);

  const handleUpdatePainting = async (props) => {
    await PaintingService.update(props);
    await handleFetchPaintings();
  };
  React.useEffect(() => {
    handleFetchPaintings();
  }, [handleFetchPaintings]);

  return (
    <Box sx={{
      display: 'flex', gap: { xs: 4, xl: 0 }, py: 3, px: 3,
    }}
    >
      <Filters drawerWidth={drawerWidth} />
      <Grid container spacing={3} sx={{ pl: { xl: `${drawerWidth}px` } }}>
        {paintings.map(({
          id,
          title,
          description,
          img,
          price,
          sizeId,
          liked,
          size,
        }) => (
          <Grid key={id} item xs={12} sm={6} md={4} xl={3}>
            <GalleryCard
              id={id}
              title={title}
              description={description}
              img={img}
              price={price}
              sizeId={sizeId}
              liked={liked}
              size={size}
              updatePainting={handleUpdatePainting}
            />
            {title}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GalleryPage;
