async function postLoader({ params }) {
  try {
    const { postId } = params;

    if (!postId) throw new Error('This post cannot be displayed');

    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'GET',
    });

    if (!response.ok) throw new Error('This post cannot be displayed');

    const post = await response.json();

    return post;
  } catch {
    throw new Error('This post cannot be displayed');
  }
}

export default postLoader;
