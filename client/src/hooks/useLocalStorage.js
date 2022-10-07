import React from 'react';

const useLocalStorage = (name, defaultValue) => {
  const [data, setData] = React.useState(JSON.parse(localStorage.getItem(name)) ?? defaultValue);

  const syncedSetData = React.useCallback((newData) => {
    localStorage.setItem(name, JSON.stringify(newData));
    setData(newData);
  }, [name]);

  return [
    data,
    syncedSetData,
  ];
};

export default useLocalStorage;
