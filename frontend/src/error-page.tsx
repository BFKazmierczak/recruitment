import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <p>Error page duh</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
