import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@/src/styles/main.scss';
import '@/src/styles/main.scss';

import Layout from './components/layout/Layout';
import ErrorPage from './error-page';
import { rootLoader } from './loaders';
import authLoader from './loaders/authLoader';
import bookmarksLoader from './loaders/bookmarksLoader';
import postLoader from './loaders/postLoader';
import Add from './routes/Add';
import Bookmarks from './routes/Bookmarks';
import Edit from './routes/Edit';
import Explore from './routes/Explore';
import Login from './routes/Login';
import PostRoute from './routes/PostRoute';
import Profile from './routes/Profile';
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
        path: '/add',
        element: <Add />,
      },
      {
        path: '/edit/:postId',
        element: <Edit />,
        loader: postLoader,
      },
      {
        path: '/post/:postId',
        element: <PostRoute />,
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
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/bookmarks',
        element: <Bookmarks />,
        loader: bookmarksLoader,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <div className="app-root">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
