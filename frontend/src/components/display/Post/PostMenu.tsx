import { ReactNode } from 'react';

import { MenuProps } from '@mui/material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

type PostAction = {
  restricted?: boolean;
  title: string;
  icon: ReactNode;
  handler: () => void;
};

interface PostMenuProps extends MenuProps {
  actions: PostAction[];
}

const PostMenu = ({ onClose, actions, ...props }: PostMenuProps) => {
  return (
    <Menu {...props}>
      {actions.map((action) => {
        if (!action.restricted)
          return (
            <MenuItem onClick={action.handler}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText>{action.title}</ListItemText>
            </MenuItem>
          );
      })}
    </Menu>
  );
};

export default PostMenu;
