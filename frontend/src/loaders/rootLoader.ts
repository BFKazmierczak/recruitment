import { getUser } from '../api';
import { BookmarkType, PostType, PostWithBookmarksType } from '../shared/types';
import { addPosts } from '../state/posts/postsSlice';
import { store } from '../state/store';

function getBookmarkId(bookmarks: BookmarkType[], userId) {
  console.log('ID:', userId);
  console.log({ bookmarks });
  const bookmark = bookmarks.find((bookmark) => bookmark.userId === userId);
  console.log({ bookmark });

  return bookmark?.id;
}

async function rootLoader({ params }) {
  const { data: posts } = store.getState().posts;
  const { token: Authorization, user } = getUser();

  const filters = `_sort=id&_order=desc&_embed=bookmarks`;

  if (posts.length) {
    // _gt filter is implemented in json-server version 1.0.0 and above (couldn't get it to work)
    const response = await fetch(`http://localhost:3000/api/posts?id_gte=${posts[0].id}&${filters}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
    });

    const newPosts: PostWithBookmarksType[] = await response.json();

    const mappedPosts = newPosts
      .slice(0, newPosts.length - 1)
      .map((post) => ({ ...post, bookmarkId: getBookmarkId(post.bookmarks, user.id) }));

    const merged = [...mappedPosts, ...posts];

    if (mappedPosts.length) store.dispatch(addPosts(mappedPosts));

    return {
      posts: merged,
    };
  }

  try {
    const response = await fetch(`http://localhost:3000/api/posts?${filters}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
    });

    if (!response.ok) throw new Error(response.statusText);

    const fetchedPosts = (await response.json()) as PostWithBookmarksType[];

    const mappedPosts = fetchedPosts.map((post) => ({ ...post, bookmarkId: getBookmarkId(post.bookmarks, user.id) }));

    store.dispatch(addPosts(mappedPosts));

    return {
      posts: mappedPosts,
    };
  } catch (error) {
    throw new Error(`We were unable to get new posts: ${error}`);
  }
}

export default rootLoader;
