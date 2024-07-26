import { redirect } from 'react-router-dom';

import { store } from '../state/store';

async function authLoader({ params, request }) {
  const { user } = store.getState().auth;

  const pathname = new URL(request.url).pathname;

  const match = pathname === '/login' || pathname === '/register';

  if (!user && !match) {
    return redirect(`/login?redirectTo=${pathname.replace('/', '')}`);
  }

  return null;
}

export default authLoader;
