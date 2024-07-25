import { FC, MouseEvent } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import { NavButton } from '@/src/components/buttons';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Grid, IconButton } from '@mui/material';

const Navbar: FC = () => {
  const navigate = useNavigate();

  const navbarOptions = [
    <NavButton key="add-nav" href="/add" title="Add">
      <Avatar variant="circular" color="primary">
        <AddIcon />
      </Avatar>
    </NavButton>,

    <NavButton key="friends-nav" href="/friends" title="Friends">
      <GroupIcon />
    </NavButton>,

    <NavButton key="settings-nav" href="/settings" title="Settings">
      <SettingsIcon />
    </NavButton>,
  ];

  function handleAdd(event: MouseEvent<SVGSVGElement>) {
    navigate('/add');
  }

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <NavButton key="home-nav" href="/" title="Home">
              <HomeIcon />
            </NavButton>
          </Grid>

          <Grid item>
            <NavButton key="explore-nav" href="/explore" title="Explore">
              <SearchIcon />
            </NavButton>
          </Grid>

          <div>
            <NavButton key="add-nav" href="/add" title="Add">
              <AddIcon />
            </NavButton>

            <div className="navbar-main-button-container">
              <NavButton key="add-nav" href="/add" title="Add">
                <IconButton>
                  <Avatar
                    className="navbar-main-button"
                    variant="circular"
                    color="primary"
                    style={{ color: 'black', backgroundColor: '#ffd20c' }}
                  >
                    <AddIcon />
                  </Avatar>
                </IconButton>
              </NavButton>
            </div>
          </div>

          <Grid item>
            <NavButton key="bookmarks-nav" href="/bookmarks" title="Bookmarks">
              <BookmarkIcon />
            </NavButton>
          </Grid>

          <Grid item>
            <NavButton key="profile-nav" href="/profile" title="My Profile">
              <PersonIcon />
            </NavButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Navbar;
