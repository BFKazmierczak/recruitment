import { Outlet, useLocation } from 'react-router-dom';

import '@/src/styles/main.scss';

import Navbar from './Navbar';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="root-layout">
      <main>
        <Outlet />
      </main>
      {pathname !== '/login' && pathname !== '/register' && <Navbar />}
    </div>
  );
};

export default Layout;
