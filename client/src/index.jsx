import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { AuthProvider } from './store/auth/auth-context';
import App from './app';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </AuthProvider>,
  // </React.StrictMode>,
);
