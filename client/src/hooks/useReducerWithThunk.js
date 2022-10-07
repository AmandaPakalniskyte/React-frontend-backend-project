import React from 'react';

const useReducerWithThunk = (reducer, initialState) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const conditionalThunkDispatch = (action) => {
    if (typeof action === 'function') {
      action(conditionalThunkDispatch, () => state);
    } else {
      dispatch(action);
    }
  };

  return [state, conditionalThunkDispatch];
};

export default useReducerWithThunk;
