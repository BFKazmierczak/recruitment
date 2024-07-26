import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';

import { deleteBookmark, saveBookmark } from '@/src/api';
import { addBookmark, removeBookmark } from '@/src/state/bookmarks/bookmarksSlice';
import { replacePost } from '@/src/state/posts/postsSlice';
import '@/src/styles/main.scss';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Backdrop, Box, Button, Fade, Grid, IconButton, Input, Modal, SxProps, Tooltip } from '@mui/material';

import CustomModal from '../CustomModal';

interface PostActionBarProps {
  postId: number;
  bookmarkId?: number;
}

/**
 * PostActionBar Component
 *
 * Enables user to add a post to bookmark
 *
 * @component
 *
 * @prop {number} postId - ID of the associated post.
 * @prop {number} [bookmarkId] - optional bookmark ID.
 */
const PostActionBar = ({ postId, bookmarkId = undefined }: PostActionBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const [bookmarkName, setBookmarkName] = useState<string>('New bookmark');

  async function handleBookmarkAdd() {
    const response = await saveBookmark(postId, bookmarkName);

    if (response.status === 0) {
      dispatch(
        replacePost({
          id: postId,
          bookmarkId: response.payload.id,
        }),
      );
      dispatch(addBookmark(response.payload));
      toast.success('Successfully added a bookmark', { position: 'top-center', theme: 'dark' });
    } else {
      toast.error('Unable to add a bookmark', { position: 'top-center', theme: 'dark' });
    }
  }

  async function handleBookmarkRemove() {
    const response = await deleteBookmark(bookmarkId);

    if (response.status === 0) {
      dispatch(
        replacePost({
          id: postId,
          bookmarkId: undefined,
        }),
      );
      dispatch(removeBookmark(bookmarkId));
      toast.success('Successfully removed a bookmark', { position: 'top-center', theme: 'dark' });
      navigate('/'); // page refresh hack
    } else {
      toast.error('Unable to remove a bookmark', { position: 'top-center', theme: 'dark' });
    }
  }

  return (
    <>
      <div className="post-action">
        {!bookmarkId && (
          <Tooltip title="Add To Bookmarks">
            <IconButton size="small" onClick={() => setCreateDialogOpen(true)}>
              <BookmarkBorderIcon style={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}

        {bookmarkId && (
          <Tooltip title="Remove From Bookmarks">
            <IconButton size="small" onClick={() => setDeleteDialogOpen(true)}>
              <BookmarkIcon color="primary" style={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </div>

      <CustomModal open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <h5>Please enter bookmark name</h5>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setCreateDialogOpen(false);
            handleBookmarkAdd();
          }}
        >
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Input
                placeholder="Enter bookmark name"
                fullWidth
                value={bookmarkName}
                onChange={(event) => setBookmarkName(event.target.value)}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="small"
                disabled={!bookmarkName.length}
                type="submit"
              >
                Add to bookmarks
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                size="small"
                onClick={() => setCreateDialogOpen(false)}
              >
                Go back
              </Button>
            </Grid>
          </Grid>
        </form>
      </CustomModal>

      <CustomModal open={deleteDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <h5>Are you sure want to remove the bookmark?</h5>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              fullWidth
              color="error"
              size="small"
              onClick={() => {
                setDeleteDialogOpen(false);
                handleBookmarkRemove();
              }}
            >
              Yes, delete from bookmarks
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              size="small"
              onClick={() => setDeleteDialogOpen(false)}
            >
              No, go back
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
};

export default PostActionBar;
