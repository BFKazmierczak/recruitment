import { PostType } from '../shared/types';
import { addPosts } from '../state/posts/postsSlice';
import { store } from '../state/store';

async function rootLoader({ params }) {
  const { data: posts } = store.getState().posts;

  if (posts.length) {
    // _gt filter does is implemented in json-server >= 1.0.0 which does not work
    const filters = `id_gte=${posts[0].id}&_sort=id&_order=desc`;

    const response = await fetch(`http://localhost:3000/api/posts?${filters}`, {
      method: 'GET',
    });

    const newPosts: PostType[] = await response.json();
    const mappedPosts = newPosts.slice(0, newPosts.length - 1).map((post) => ({ ...post, new: true }));

    const merged = [...mappedPosts, ...posts];

    if (mappedPosts.length) store.dispatch(addPosts(mappedPosts));

    return {
      posts: merged,
    };
  }

  try {
    console.log('fetching posts...');

    const response = await fetch('http://localhost:3000/api/posts?_sort=id&_order=desc', {
      method: 'GET',
    });

    if (!response.ok) throw new Error('We were unable to get new posts. Please try to refresh the page.');

    const fetchedPosts = await response.json();

    store.dispatch(addPosts(fetchedPosts));

    return {
      posts: fetchedPosts,
    };
  } catch (error) {
    throw new Error('We were unable to get new posts. Please try to refresh the page.');
  }
}

export default rootLoader;
