import { redirect } from 'react-router-dom';

import { store } from '../state/store';

async function authLoader({ params, request }) {
  const { isAuthenticated } = store.getState().auth;

  const pathname = new URL(request.url).pathname;

  console.log({ pathname });

  const match = pathname === '/login' || pathname === '/register';

  if (!isAuthenticated && !match) return redirect('/login');

  return null;
}

export default authLoader;
