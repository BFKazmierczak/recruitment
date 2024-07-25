import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { ToastContainer } from 'material-react-toastify';

import { store } from '@/src/state/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffd20c',
      contrastText: '#000',
    },
    secondary: {
      main: '#000',
    },
  },
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
