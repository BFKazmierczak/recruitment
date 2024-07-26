import { useDispatch, useSelector } from 'react-redux';
import { useFetcher, useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';

import { Button, Divider, Grid } from '@mui/material';

import { logout } from '../state/auth/authSlice';
import { RootState } from '../state/store';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth).user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    toast.info('Logged out', { position: 'top-center', theme: 'dark' });
    navigate('/login');
  }

  return (
    <div className="route">
      <h2>Your Profile</h2>
      <Divider />
      <h3>Info</h3>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <span>
            E-Mail: <b>{user.email}</b>
          </span>
        </Grid>

        <Grid item>
          <span>
            Joined: <b>{user.createdAt}</b>
          </span>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
            Log Out
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
