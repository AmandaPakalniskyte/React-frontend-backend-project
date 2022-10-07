import React from 'react';
import AuthContext from '../store/auth/auth-context';

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
