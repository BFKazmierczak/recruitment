import { ReactNode } from 'react';

import { MenuProps } from '@mui/material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

export type PostAction = {
  hidden?: boolean;
  title: string;
  icon: ReactNode;
  handler: () => void;
};

interface PostMenuProps extends MenuProps {
  actions: PostAction[];
}

/**
 * PostMenu Component
 *
 * Renders a dynamic menu for a post
 *
 * @component
 *
 * @prop {PostAction[]} actions - available actions - actions with hidden=true won't be rendered
 */
const PostMenu = ({ onClose, actions, ...props }: PostMenuProps) => {
  return (
    <Menu {...props}>
      {actions.map((action) => {
        if (!action.hidden)
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
