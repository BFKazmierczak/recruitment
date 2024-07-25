import '@/src/styles/main.scss';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton } from '@mui/material';

import ReplyWithComment from './ShareAndComment';

const PostActionBar = () => {
  return (
    <div className="post-action">
      {/* <IconButton title="Give a Star">
        <StarOutlineIcon />
      </IconButton>

      <IconButton title="Share with a Comment">
        <ReplyWithComment />
      </IconButton>

      <IconButton title="Add a Comment">
        <ChatBubbleOutlineIcon />
      </IconButton> */}

      <IconButton size="small">
        <BookmarkBorderIcon style={{ fontSize: 16 }} />
      </IconButton>
    </div>
  );
};

export default PostActionBar;
