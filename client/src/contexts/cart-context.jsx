import * as React from 'react';

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = React.useState([]);

  // React.useMemo( FUNKCIJA_KURI_GRĄŽINA_REIKŠMĘ, MASYVAS_SU_STEBIMAIS_KINTAMAISIAIS)
  // Kuomet keičiasi stebimi kintamieji, perskaičiuojama reikšmė kviečiant funkciją pirmu argumentu
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
  }), [cartItems]);

  return (
    <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
