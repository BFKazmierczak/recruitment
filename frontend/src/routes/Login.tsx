import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useFetcher, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { toast } from 'material-react-toastify';

import { Button, Grid, Input } from '@mui/material';

import { loginUser } from '../api';
import { login } from '../state/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await loginUser(email, password);

    if (response.status === 0) {
      toast.success('Successfully logged in', { position: 'top-center', theme: 'dark' });
      dispatch(login(response.payload));

      const redirectTo = searchParams.get('redirectTo') || '';

      navigate(`/${redirectTo}`);
    } else {
      toast.error("Couldn't login", { position: 'top-center', theme: 'dark' });
    }
  }

  return (
    <div className="route">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Input placeholder="E-Mail" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
          </Grid>

          <Grid item>
            <Input
              placeholder="Password"
              fullWidth
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Grid>

          <Grid item>
            <span>No account yet?</span>
          </Grid>

          <Grid item>
            <Link to="/register">
              <Button variant="contained" color="secondary" fullWidth>
                Create Account
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
