import { Outlet } from 'react-router-dom';

import '@/src/styles/main.scss';

import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="root-layout">
      <main>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
