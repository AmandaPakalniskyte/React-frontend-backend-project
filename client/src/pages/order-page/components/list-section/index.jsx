import * as React from 'react';
import { Box, Typography } from '@mui/material';
import CartContext from '../../../../contexts/cart-context';
import Item from './components/item/item-grid-big-screen';
import ItemSmall from './components/item/item-grid-small-screen';
import TotalSection from './components/total-section';

const fetchItem = async ({ id, count }) => {
  const response = await fetch(`http://localhost:8000/paintings/${id}`);
  const item = await response.json();

  return {
    ...item,
    count,
  };
};

const fetchCartItems = async (cartItems) => {
  const items = await Promise.all(cartItems.map((item) => fetchItem(item)));

  return items;
};

const ListSection = () => {
  const { cartItems: cartItemsData, deleteItem, addToCart } = React.useContext(CartContext);
  const [cartItems, setCartItems] = React.useState([]);
  // console.table(cartItems);

  React.useEffect(() => {
    (async () => {
      const fetchedItems = await fetchCartItems(cartItemsData);

      setCartItems(fetchedItems);
    })();
  }, [cartItemsData]);

  const total = cartItems.reduce((prevSum, { count, price }) => prevSum + count * price, 0);
  console.log(cartItems);

  return (
    <Box
      alignSelf="center"
      sx={() => ({
        width: {
          xl: '70%',
          lg: '100%',
          md: '100%',
          sm: '100%',
          xs: '100%',
        },
      })}
    >
      {cartItems.length > 0 && (
        <Typography variant="h4" sx={(theme) => ({ color: theme.palette.common.white, mb: 2 })}>Jūsų krepšelis</Typography>
      )}
      {cartItems.length === 0 && (
        <Typography variant="h4" sx={(theme) => ({ color: theme.palette.common.white })}>Jūsų krepšelis tuščias</Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {cartItems.map(({
          id,
          img,
          title,
          size,
          sizeId,
          price,
          count,
        }) => (
          <Item
            id={id}
            img={img}
            title={title}
            sizeId={sizeId}
            size={size}
            price={price}
            count={count}
            setCount={(newCount) => addToCart({ id, count: newCount })}
            deleteItem={() => deleteItem(id)}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {cartItems.map(({
          id,
          img,
          title,
          size,
          sizeId,
          price,
          count,
        }) => (
          <ItemSmall
            id={id}
            img={img}
            title={title}
            sizeId={sizeId}
            size={size}
            price={price}
            count={count}
            setCount={(newCount) => addToCart({ id, count: newCount })}
            deleteItem={() => deleteItem(id)}
          />
        ))}
      </Box>
      <TotalSection total={total} />
    </Box>
  );
};

export default ListSection;
