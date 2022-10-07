import * as React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const cartContextValue = React.useMemo(() => ({
    cartItems,

    cartItemsCount: cartItems.reduce((sum, { count }) => sum + count, 0),

    addToCart: (item) => {
      if (cartItems.find((x) => x.id === item.id)) {
        if (item.count === 0) {
          setCartItems(cartItems.filter((x) => x.id !== item.id));
        } else {
          setCartItems(cartItems.map((x) => (x.id === item.id ? { ...x, count: item.count } : x)));
        }
      } else {
        setCartItems([...cartItems, item]);
      }
    },

    getItemCount: (id) => cartItems.find((x) => x.id === id)?.count ?? 0,

    deleteItem: (id) => setCartItems(cartItems.filter((x) => x.id !== id)),
  }), [cartItems, setCartItems]);

  return (
    <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
