import * as React from 'react';

const FavouritesContext = React.createContext(0);
export const FavouritesProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = React.useState([]);

  const favouritesContextValue = React.useMemo(() => ({
    favouriteItems,
    addToFavourites: (item) => {
      if (favouriteItems.filter((x) => x.id === item.id)) {
        setFavouriteItems([...favouriteItems, item]);
      } else {
        setFavouriteItems([]);
      }
    },

  }), [favouriteItems]);

  return (
    <FavouritesContext.Provider value={favouritesContextValue}>
      {children}

    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;
