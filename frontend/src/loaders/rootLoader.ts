import { useSelector } from 'react-redux';

import { addPosts } from '../state/posts/postsSlice';
import { RootState, store } from '../state/store';

async function rootLoader({ params }) {
  const posts = store.getState().posts.data;

  console.log('Posts in rootLoader:', posts);

  if (posts.length) {
    console.log(posts[0]);

    // _gt filter does is implemented in json-server >= 1.0.0 which does not work
    const filters = `id_gte=${posts[0].id}&_sort=id&_order=desc`;

    const response = await fetch(`http://localhost:3000/api/posts?${filters}`, {
      method: 'GET',
    });

    const newPosts = await response.json();

    console.log({ newPosts });

    return posts;
  }

  try {
    console.log('fetching posts...');

    const response = await fetch('http://localhost:3000/api/posts?_sort=id&_order=desc', {
      method: 'GET',
    });

    if (!response.ok) throw new Error('We were unable to get new posts. Please try to refresh the page.');

    const fetchedPosts = await response.json();

    store.dispatch(addPosts(fetchedPosts));

    return fetchedPosts;
  } catch (error) {
    throw new Error('We were unable to get new posts. Please try to refresh the page.');
  }
}

export default rootLoader;
