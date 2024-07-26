import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';

import { deleteBookmark, saveBookmark } from '@/src/api';
import { addBookmark, removeBookmark } from '@/src/state/bookmarks/bookmarksSlice';
import { addPosts, replacePost } from '@/src/state/posts/postsSlice';
import '@/src/styles/main.scss';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Backdrop, Box, Button, Fade, Grid, IconButton, Modal, SxProps, Tooltip } from '@mui/material';

import ReplyWithComment from './ShareAndComment';

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: 200,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface PostActionBarProps {
  postId: number;
  bookmarkId?: number;
}

const PostActionBar = ({ postId, bookmarkId = undefined }: PostActionBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bookmarkName, setBookmarkName] = useState<string>('test bookmark');

  async function handleBookmarkAdd() {
    const response = await saveBookmark(postId, bookmarkName);

    if (response.status === 0) {
      console.log({ bookmarkId });

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
    const response = await deleteBookmark(postId);

    if (response.status === 0) {
      dispatch(
        replacePost({
          id: postId,
          bookmarkId: undefined,
        }),
      );
      dispatch(removeBookmark(response.payload));
      toast.success('Successfully added a bookmark', { position: 'top-center', theme: 'dark' });
      navigate('/'); // page refresh hack
    } else {
      toast.error('Unable to add a bookmark', { position: 'top-center', theme: 'dark' });
    }
  }

  return (
    <>
      <div className="post-action">
        {!bookmarkId && (
          <Tooltip title="Add To Bookmarks">
            <IconButton size="small" onClick={() => handleBookmarkAdd()}>
              <BookmarkBorderIcon style={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}

        {bookmarkId && (
          <Tooltip title="Remove From Bookmarks">
            <IconButton size="small" onClick={() => setModalOpen(true)}>
              <BookmarkIcon color="primary" style={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <h5>Are you sure want to remov the post from bookmarks?</h5>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  size="small"
                  onClick={() => {
                    setModalOpen(false);
                    handleBookmark('remove');
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
                  onClick={() => setModalOpen(false)}
                >
                  No, go back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PostActionBar;
