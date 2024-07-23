import { FC, MouseEvent } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import { NavButton } from '@/src/components/buttons';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

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

const Navbar: FC = () => {
  const navigate = useNavigate();

  function handleAdd(event: MouseEvent<SVGSVGElement>) {
    navigate('/add');
  }

  return (
    <div className="navbar-container">
      <div
        style={{
          position: 'absolute',
          top: -20,
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          zIndex: 1,
        }}
      >
        <AddIcon className="navbar-post-button" style={{ width: 40 }} onClick={handleAdd} />
      </div>
      <div className="navbar">{navbarOptions.map((option) => option)}</div>
    </div>
  );
};

export default Navbar;
