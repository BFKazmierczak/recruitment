import React, { FormEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'material-react-toastify';

import { createPost, updatePost } from '@/src/api';
import { PostType } from '@/src/shared/types';
import { addPosts, replacePost } from '@/src/state/posts/postsSlice';
import '@/src/styles/main.scss';
import { Box, Button, colors, Grid, TextField, Tooltip } from '@mui/material';

const minLength = 10;
const maxLength = 250;

interface PostFormProps {
  post?: PostType;
}

const PostForm = ({ post = undefined }: PostFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [content, setContent] = useState<string>(post?.content ?? '');

  const lengthCheck = content.length <= maxLength && content.length >= minLength;

  async function handlePost(event: MouseEvent<HTMLButtonElement>) {
    const response = await createPost(content);

    if (response.status === 0) {
      dispatch(addPosts([response.payload]));
      toast.success('Post added successfully', { position: 'top-center', theme: 'dark' });
      navigate('/');
    } else {
      toast.error(`Unable to add post: ${response.error}`, { position: 'top-center', theme: 'dark' });
    }
  }

  async function handleSave(event: MouseEvent<HTMLButtonElement>) {
    const response = await updatePost(post.id, content);

    if (response.status === 0) {
      dispatch(replacePost(response.payload));
      toast.success('Successfully updated', { position: 'top-center', theme: 'dark' });
      navigate('/');
    } else {
      toast.error(`Post update error: ${response.error}`, { position: 'top-center', theme: 'dark' });
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

      <Box>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Tooltip title={lengthCheck ? '' : `A post must be between ${minLength} and ${maxLength} characters`}>
              <div>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!lengthCheck}
                  type="submit"
                  onClick={post ? handleSave : handlePost}
                >
                  {post ? 'Save changes' : 'Post it'}
                </Button>
              </div>
            </Tooltip>
          </Grid>

          {post && (
            <Grid item>
              <Button variant="contained" fullWidth color="secondary" onClick={() => navigate('/')}>
                Cancel editing
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default PostForm;
