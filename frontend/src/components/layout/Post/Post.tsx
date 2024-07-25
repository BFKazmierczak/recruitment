import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

import { deletePost } from '@/src/api_actions';
import { PostType } from '@/src/shared/types';
import { removePost } from '@/src/state/posts/postsSlice';
import '@/src/styles/main.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, SxProps } from '@mui/material';

import PostActionBar from './PostActionBar';
import PostMenu from './PostMenu';

interface PostProps {
  post: PostType;
}

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

  const open = Boolean(anchorEl);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEdit() {
    navigate(`/edit/${post.id}`);
  }

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(`https://localhost:8081/post/${post.id}`);
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

        <PostMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClick={handleClose}
          onClose={handleClose}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopyUrl={handleCopyUrl}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        />
      </div>
    </>
  );
};

export default Post;
