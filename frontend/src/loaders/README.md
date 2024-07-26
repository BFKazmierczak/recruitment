### This directory stores loaders for most of the routes.

- **authLoader** - serves as an authentication middleware. Checks for existence of user object in global store and redirects to **/login** if undefined
- **rootLoader** - fetches initial posts, implements a primitive mechanism
  for fetching only new posts if any posts are already stored in the global state
- **postLoader** - fetches only one post based on provided **postId** param.
  Used in routes like /post/:postId, /edit
- **bookmarksLoader** - used for fetching and storing user's bookmarks
