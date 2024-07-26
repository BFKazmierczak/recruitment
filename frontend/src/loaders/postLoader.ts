import { getUser } from '../api';

async function postLoader({ params }) {
  const { token: Authorization } = getUser();

  try {
    const { postId } = params;

    if (!postId) throw new Error('This post cannot be displayed');

    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const post = await response.json();

    return post;
  } catch (error) {
    throw new Error(error);
  }
}

export default postLoader;
