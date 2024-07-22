import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

import '@/src/styles/main.scss';

const ErrorPage: FC = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <p>Something went wrong</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
