import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_CLEAR_ERRORS,
  AUTH_LOGOUT,
  AUTH_INITIALIZED,
  AUTH_CLEAR_REDIRECT,
} from './auth-action-types';

const authReducer = (currentState, action) => {
  const newState = {
    ...currentState,
  };

  // State Mutations
  switch (action.type) {
    case AUTH_LOADING: {
      newState.loading = true;
      newState.error = null;
      break;
    }

    case AUTH_SUCCESS: {
      localStorage.setItem('token', action.payload.token);

      newState.loggedIn = true;
      newState.user = action.payload.user;
      newState.token = action.payload.token;
      newState.loading = false;
      newState.role = action.payload.user.role;
      if (action.payload.redirect) {
        newState.redirect = action.payload.redirect;
      }
      break;
    }

    case AUTH_FAILURE: {
      newState.error = action.payload.message;
      newState.loading = false;
      break;
    }

    case AUTH_LOGOUT: {
      localStorage.removeItem('token');

      newState.loggedIn = false;
      newState.loading = false;
      newState.user = null;
      newState.role = 'VISITOR';
      newState.token = null;
      break;
    }

    case AUTH_CLEAR_ERRORS: {
      newState.error = null;
      break;
    }

    case AUTH_INITIALIZED: {
      newState.initialized = true;
      break;
    }
    case AUTH_CLEAR_REDIRECT: {
      newState.redirect = null;
      break;
    }

    default: {
      console.error('Unexpected Action type in AuthReducer');
    }
  }

  console.log(
    `%c${action.type}: %c${JSON.stringify(newState, null, 4)}`,
    'color: blue',
    'font-weight: 700',
  );

  return newState;
};

export default authReducer;
