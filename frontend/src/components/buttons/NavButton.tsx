import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Tooltip } from '@mui/material';

import '../../styles/main.scss';

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
