import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import '@/src/styles/main.scss';
import { Tooltip } from '@mui/material';

interface NavButtonProps {
  children: ReactNode;
  href: string;
  title: string;
}

const NavButton = ({ children, href, title }: NavButtonProps) => {
  return (
    <Tooltip className="navButton" title={title}>
      <Link to={href}>{children}</Link>
    </Tooltip>
  );
};

export default NavButton;
