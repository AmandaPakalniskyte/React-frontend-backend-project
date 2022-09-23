import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FavouritesContext from '../../contexts/favourites-context';
import FavouriteCard from './favourite-card';
import BackToGalleryButton from '../../components/back-to-galerry-button';

const fetchItem = async (id) => {
  const response = await fetch(`http://localhost:8000/paintings/${id}?_expand=category&_expand=size&_expand=color`);
  const item = await response.json();
  console.log(item);

  return item;
};

const fetchFavouriteItems = async (favouriteItems) => {
  const items = await Promise.all(favouriteItems.map(fetchItem));

  return items;
};

const FavouritesPage = () => {
  const { favouriteItems: favouriteItemsData } = React.useContext(FavouritesContext);
  const [favouriteItems, setFavouriteItems] = React.useState([]);
  console.log(favouriteItems);
  React.useEffect(() => {
    (async () => {
      const fetchedItems = await fetchFavouriteItems(favouriteItemsData);

      setFavouriteItems(fetchedItems);
    })();
  }, [favouriteItemsData]);

  return (

    <Box sx={() => ({
      py: 5,
      px: {
        lg: 10,
        md: 10,
        sm: 10,
        xs: 5,
      },
    })}
    >
      {favouriteItems.length === 0 && (
        <Typography variant="h4" sx={(theme) => ({ color: theme.palette.common.white })}>Jūs neturite mėgstamų paveikslų</Typography>
      )}
      {favouriteItems.length > 0 && (
        <Box sx={{
          display: 'flex', gap: { xs: 4, xl: 0 },
        }}
        >
          <Grid container spacing={3}>
            {favouriteItems.map(({
              id,
              title,
              description,
              img,
              category,
              price,
              size,
              liked,
            }) => (
              <Grid key={id} item xs={12} sm={6} md={4} xl={3}>
                <FavouriteCard
                  key={id}
                  title={title}
                  description={description}
                  img={img}
                  category={category}
                  price={price}
                  size={size}
                  liked={liked}
                />
              </Grid>
            ))}
          </Grid>

        </Box>
      )}
      <BackToGalleryButton />
    </Box>
  );
};

export default FavouritesPage;
