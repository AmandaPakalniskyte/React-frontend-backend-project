import * as React from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Image, TypographyLimited } from '../../../components';
import CartContext from '../../../contexts/cart-context';
import FavouritesContext from '../../../contexts/favourites-context';

const Item = styled(Box)(({ theme }) => ({

  ':hover': {
    color: theme.palette.common.white,
    cursor: 'pointer',
    opacity: '0.7',
  },

}));

const GalleryCard = ({
  id,
  title,
  img,
  description,
  price,
  liked,
  size,
  updatePainting,
}) => {
  const navigate = useNavigate();
  const { addToCart, getItemCount, deleteItem } = React.useContext(CartContext);
  const itemCountInCart = getItemCount(id);
  const [count, setCount] = React.useState(itemCountInCart === 0 ? 1 : itemCountInCart);

  React.useEffect(() => {
    setCount(itemCountInCart === 0 ? 1 : itemCountInCart);
  }, [itemCountInCart]);

  const { addToFavourites } = React.useContext(FavouritesContext);

  return (
    <Card sx={{
      display: 'flex', flexDirection: 'column', height: '100%', p: 1,
    }}
    >
      <Box sx={{ position: 'relative', width: '100%', pt: '95%' }}>
        <Item sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: 'black',
          opacity: '0',
          textAlign: 'center',
          pt: '45%',
        }}
        >
          {size.label}
        </Item>
        <Image src={img} sx={{ position: 'absolute', top: 0, left: 0 }} />
      </Box>
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Box sx={{
          display: 'flex',

          alignItems: 'center',
          mb: 2,
        }}
        >
          <Typography variant="h5" component="div" sx={{ mr: 2 }}>{title}</Typography>
          <IconButton
            sx={(theme) => ({ color: theme.palette.primary.main })}
            onClick={() => { addToFavourites(id); updatePainting({ id, liked: !liked }); }}
          >
            {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon color="primary" />}
          </IconButton>
          <IconButton
            sx={(theme) => ({ color: theme.palette.primary.main })}
            onClick={() => { navigate(`/info/${id}`); }}
          >
            <VisibilityIcon />
          </IconButton>
        </Box>
        <TypographyLimited variant="body2" color="text.secondary">{description}</TypographyLimited>
        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
          {price}
          {' '}
          EUR
        </Typography>
      </CardContent>
      <CardActions sx={{ pb: 2, alignSelf: 'center' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => addToCart({ id, count })}
          disabled={count === itemCountInCart}
          sx={(theme) => ({ color: theme.palette.primary.contrastText, py: '12px' })}
        >

          <AddShoppingCartIcon />

        </Button>
        <Box sx={{ display: 'flex', ml: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              p: 0,
              height: 48,
              width: 20,
              minWidth: 0,
              borderRadius: 0,
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
              boxShadow: 'none',
            }}
            onClick={() => setCount(count - 1)}
            disabled={count <= 1}
          >
            -
          </Button>
          <OutlinedInput
            variant="contained"
            size="small"
            inputProps={{
              style: {
                padding: 0, width: 30, minWidth: 0, textAlign: 'center',
              },
              value: count,
            }}
            readOnly
            sx={{ borderRadius: 0 }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              p: 0,
              height: 48,
              width: 20,
              minWidth: 0,
              borderRadius: 0,
              borderBottomRightRadius: 4,
              borderTopRightRadius: 4,
              boxShadow: 'none',
            }}
            onClick={() => setCount(count + 1)}
          >
            +
          </Button>
        </Box>
        <Button
          size="small"
          variant="contained"
          onClick={() => deleteItem(id)}
          sx={(theme) => ({ color: theme.palette.primary.contrastText, py: '12px' })}
        >
          <DeleteIcon />

        </Button>
      </CardActions>
    </Card>
  );
};

export default GalleryCard;
