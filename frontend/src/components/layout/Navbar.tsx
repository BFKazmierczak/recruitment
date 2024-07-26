import { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavButton } from '@/src/components/buttons';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Grid, IconButton } from '@mui/material';

const Navbar: FC = () => {
  const navigate = useNavigate();

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
            <NavButton key="add-nav" href="/add" title="Add a Post">
              <AddIcon />
            </NavButton>

            <div className="navbar-main-button-container">
              <NavButton key="add-nav" href="/add" title="Add">
                <IconButton>
                  <Avatar
                    className="navbar-main-button"
                    variant="circular"
                    color="primary"
                    style={{ color: 'black', backgroundColor: '#6c78e3' }}
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
