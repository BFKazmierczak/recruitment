import { FC } from 'react';

import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavButton } from '../buttons';

const Navbar: FC = () => {
  const navbarOptions = [
    <NavButton href="/" title="Home">
      <HomeIcon />
    </NavButton>,
    <NavButton href="/explore" title="Explore">
      <SearchIcon />
    </NavButton>,
    <NavButton href="/messages" title="Messages">
      <MailIcon />
    </NavButton>,
    <NavButton href="/friends" title="Friends">
      <GroupIcon />
    </NavButton>,
    <NavButton href="/settings" title="Settings">
      <SettingsIcon />
    </NavButton>,
  ];

  return <div className="navbar">{navbarOptions.map((option) => option)}</div>;
};

export default Navbar;
