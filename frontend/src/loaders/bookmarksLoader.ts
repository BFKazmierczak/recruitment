import { getBookarks } from '../api';
import { setBookmarks } from '../state/bookmarks/bookmarksSlice';
import { store } from '../state/store';

async function bookmarksLoader() {
  const response = await getBookarks();

  if (response.status === 0) {
    store.dispatch(setBookmarks(response.payload));
    return response.payload;
  } else {
    throw new Error(response.error);
  }
}

export default bookmarksLoader;
