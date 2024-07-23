import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from '@/src/state/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Layout from './components/layout/Layout';
import ErrorPage from './error-page';
import { rootLoader } from './loaders';
import Add from './routes/Add';
import Messages from './routes/Messages';
import Root from './routes/Root';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/add',
        element: <Add />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
