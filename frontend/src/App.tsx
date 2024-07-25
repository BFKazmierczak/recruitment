import { FC } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import '@/src/styles/main.scss';

import Layout from './components/layout/Layout';
import ErrorPage from './error-page';
import { rootLoader } from './loaders';
import authLoader from './loaders/authLoader';
import postLoader from './loaders/postLoader';
import Add from './routes/Add';
import Edit from './routes/Edit';
import Login from './routes/Login';
import Messages from './routes/Messages';
import Register from './routes/Register';
import Root from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: authLoader,
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
      {
        path: '/edit/:postId',
        element: <Edit />,
        loader: postLoader,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
