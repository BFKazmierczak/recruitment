import { ReactNode } from 'react';

import '@/src/styles/main.scss';
import { Tooltip } from '@mui/material';

interface IconButtonProps {
  children: ReactNode;
  title: string;
}

const IconButton = ({ children, title }: IconButtonProps) => {
  return (
    <Tooltip title={title}>
      <div className="icon-button">{children}</div>
    </Tooltip>
  );
};

export default IconButton;
