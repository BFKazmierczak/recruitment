import React, { FormEvent, MouseEvent, useState } from 'react';

import '@/src/styles/main.scss';
import { Button, colors, TextField, Tooltip } from '@mui/material';

const minLength = 10;
const maxLength = 250;

const PostForm = () => {
  const [content, setContent] = useState<string>('');

  const lengthCheck = content.length <= maxLength && content.length >= minLength;

  async function handlePost(event: MouseEvent<HTMLButtonElement>) {
    await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: 'bfkazmierczak@gmail.com',
        content,
        createdAt: Date.now(),
      }),
    });
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
            Post it
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export default PostForm;
