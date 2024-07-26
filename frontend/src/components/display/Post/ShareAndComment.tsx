import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';

const ReplyWithComment = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ bottom: 0, left: 0 }}>
        <ReplyIcon />
      </div>
      <div style={{ zIndex: -1, position: 'absolute', top: 0, right: 0 }}>
        <ChatBubbleOutlineIcon style={{ color: 'grey', fontSize: 10 }} />
      </div>
    </div>
  );
};

export default ReplyWithComment;
