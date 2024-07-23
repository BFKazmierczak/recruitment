async function rootLoader({ params }) {
  try {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'GET',
    });

    if (!response.ok) throw new Error('We were unable to get new posts. Please try to refresh the page.');

    const posts = await response.json();

    return posts;
  } catch (error) {
    throw new Error('We were unable to get new posts. Please try to refresh the page.');
  }
}

export default rootLoader;
