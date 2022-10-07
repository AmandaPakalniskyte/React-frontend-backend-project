/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import useReducerWithThunk from '../../hooks/useReducerWithThunk';
import { authInitializedAction, createAuthInitializeThunkAction } from './auth-actions';
import authReducer from './auth-reducer';

const initialAuthState = {
  initialized: false,
  loggedIn: false,
  loading: false,
  user: null,
  role: 'VISITOR',
  error: null,
  token: null,
  redirect: null,
};

const AuthContext = React.createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducerWithThunk(authReducer, initialAuthState);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(createAuthInitializeThunkAction(token));
    } else {
      dispatch(authInitializedAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{
      ...state,
      dispatch,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
