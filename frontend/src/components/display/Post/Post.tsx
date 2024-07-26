import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

import { deletePost } from '@/src/api';
import { PostType } from '@/src/shared/types';
import { removePost } from '@/src/state/posts/postsSlice';
import { RootState } from '@/src/state/store';
import '@/src/styles/main.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Backdrop, Box, Button, Fade, Grid, IconButton, Modal, SxProps } from '@mui/material';

import PostActionBar from './PostActionBar';
import PostMenu from './PostMenu';

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

interface PostProps {
  post: PostType;
  isOwner?: boolean;
}

const Post = ({ post, isOwner = false }: PostProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const conditionalProps = {
    'data-new': post.new ? true : undefined,
  };

  const postActions = [
    {
      title: 'Copy URL',
      icon: <LinkIcon fontSize="small" />,
      handler: handleCopyUrl,
    },
    {
      restricted: !isOwner,
      title: 'Edit',
      icon: <EditIcon fontSize="small" />,
      handler: () => navigate(`/edit/${post.id}`),
    },
    {
      restricted: !isOwner,
      title: 'Delete',
      icon: <DeleteIcon fontSize="small" />,
      handler: () => setModalOpen(true),
    },
  ];

  const createdAt = {
    date: new Date(post.createdAt).toLocaleDateString('pl-PL'),
    time: new Date(post.createdAt).toLocaleTimeString('pl-PL'),
  };

  const editedAt = post.editedAt
    ? {
        date: new Date(post.editedAt).toLocaleDateString('pl-PL'),
        time: new Date(post.editedAt).toLocaleTimeString('pl-PL'),
      }
    : undefined;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(`http://localhost:8081/post/${post.id}`);
      toast.success('Post URL copied to clipboard', {
        position: 'top-center',
        theme: 'dark',
      });
    } catch (err) {
      toast.error("Couldn't copy the URL", {
        position: 'top-center',
        theme: 'dark',
      });
    }
  }

  async function handleDelete() {
    const ok = await deletePost(post.id);

    if (ok) {
      dispatch(removePost(post));

      toast.success('Post deleted successfully', {
        position: 'top-center',
        theme: 'dark',
      });

      navigate('.', { replace: true });
    } else {
      toast.error("Couldn't delete the post", {
        position: 'top-center',
        theme: 'dark',
      });
    }
  }

  return (
    <>
      <div {...conditionalProps} className="post">
        <div className="post-author">
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <AccountCircleIcon style={{ fontSize: '2rem' }} />
            {isOwner && <span data-owner="user">Me</span>}
            {!isOwner && <span>{post.author}</span>}
          </div>

          <IconButton aria-label="more" size="small" onClick={handleClick}>
            <MoreVertIcon style={{ fontSize: 16 }} />
          </IconButton>
        </div>

        <span className="post-body">{post.content}</span>

        <div className="post-footer">
          <div className="post-meta">
            <span>
              Posted: {createdAt.date} {createdAt.time}
            </span>

            {editedAt && (
              <span>
                Edited: {editedAt.date} {editedAt.time}
              </span>
            )}
          </div>

          <PostActionBar bookmarkId={post.bookmarkId} postId={post.id} />
        </div>

        <PostMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          actions={postActions}
          onClick={handleClose}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        />

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
              <h5>Are you sure want to delete the post?</h5>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth
                    color="error"
                    size="small"
                    onClick={() => {
                      setModalOpen(false);
                      handleDelete();
                    }}
                  >
                    Yes, delete the post
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
      </div>
    </>
  );
};

export default Post;
