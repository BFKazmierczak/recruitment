import React, { FormEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createPost } from '@/src/mutations';
import { addPosts } from '@/src/state/posts/postsSlice';
import '@/src/styles/main.scss';
import { Button, colors, TextField, Tooltip } from '@mui/material';

const minLength = 10;
const maxLength = 250;

interface PostFormProps {
  editing?: boolean;
  initialContent?: string;
}

const PostForm = ({ editing = false, initialContent = '' }: PostFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>(initialContent);

  const lengthCheck = content.length <= maxLength && content.length >= minLength;

  async function handlePost(event: MouseEvent<HTMLButtonElement>) {
    const response = await createPost(content);

    if (response.status === 0) {
      dispatch(addPosts([response.payload]));
      navigate('/');
    } else {
      // do some toasting later
      console.error(response.error);
    }
  }

  return (
    <div className="post-form">
      <div className="post-form-content">
        <span
          style={{
            fontWeight: 200,
            fontSize: 12,
            color: lengthCheck ? colors.green[400] : colors.red[400],
          }}
        >
          {content.length} / {maxLength}
        </span>
        <TextField
          variant="filled"
          fullWidth
          placeholder="Write something..."
          name="content"
          value={content}
          multiline
          minRows={4}
          maxRows={12}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <Tooltip title={lengthCheck ? '' : `A post must be between ${minLength} and ${maxLength} characters`}>
        <div>
          <Button variant="contained" fullWidth disabled={!lengthCheck} type="submit" onClick={handlePost}>
            {editing ? 'Save changes' : 'Post it'}
          </Button>
        </div>
      </Tooltip>
      {editing && (
        <Button variant="contained" fullWidth color="secondary">
          Cancel editing
        </Button>
      )}
    </div>
  );
};

export default PostForm;
