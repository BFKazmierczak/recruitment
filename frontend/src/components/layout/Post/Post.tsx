import { PostType } from '@/src/shared/types';
import '@/src/styles/main.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import PostActionBar from './PostActionBar';

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="post">
      <div className="post-author">
        <AccountCircleIcon style={{ fontSize: '2rem' }} />
        <span>{post.author}</span>
      </div>
      <div className="post-meta">
        <span>{post.created}</span>
        <span>{post.edited}</span>
      </div>
      <span className="post-body">{post.body}</span>
      <PostActionBar />
    </div>
  );
};

export default Post;
