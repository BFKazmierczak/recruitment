import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetcher, useNavigate } from 'react-router-dom';

import { deletePost } from '@/src/mutations';
import { PostType } from '@/src/shared/types';
import { removePost } from '@/src/state/posts/postsSlice';
import { RootState } from '@/src/state/store';
import '@/src/styles/main.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  SxProps,
} from '@mui/material';

import PostActionBar from './PostActionBar';

interface PostProps {
  post: PostType;
}

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

const Post = ({ post }: PostProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const conditionalProps = {
    'data-new': post.new ? true : undefined,
  };

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

  function handleEdit() {
    navigate(`/edit/${post.id}`);
    handleClose();
  }

  function handleDelete() {
    setModalOpen(true);
    handleClose();
  }

  async function handlePostDelete() {
    const ok = await deletePost(post.id);

    if (ok) {
      dispatch(removePost(post));
      setModalOpen(false);
      navigate('.', { replace: true });
    }
  }

  return (
    <>
      <div {...conditionalProps} className="post">
        <div className="post-author">
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <AccountCircleIcon style={{ fontSize: '2rem' }} />
            <span>{post.author}</span>
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

          <PostActionBar />
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy URL</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

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
                <Button variant="contained" fullWidth color="error" size="small" onClick={handlePostDelete}>
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
    </>
  );
};

export default Post;
