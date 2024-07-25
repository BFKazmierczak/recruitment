import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';

import { Button, Grid, Input } from '@mui/material';

import { registerUser } from '../api_actions';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await registerUser(email, password);

    if (response.status === 0) {
      toast.success('Account successfully created. You can now log in.', { position: 'top-center', theme: 'dark' });
      navigate('/login');
    } else {
      toast.error("Couldn't create an account", { position: 'top-center', theme: 'dark' });
    }
  }

  return (
    <div className="route">
      <h2>Register</h2>
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
              Create Account
            </Button>
          </Grid>

          <Grid item>
            <span>Already have an account?</span>
          </Grid>

          <Grid item>
            <Link to="/login">
              <Button variant="contained" color="secondary" fullWidth>
                Log in
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Register;
