import { useLoaderData } from 'react-router-dom';

import { Post } from '../components/layout';
import { PostType } from '../shared/types';

const PostRoute = () => {
  const post = useLoaderData() as PostType;

  console.log({ post });

  return (
    <div className="route" style={{ height: '50vh' }}>
      <h2>Post {post.id}</h2>
      <Post post={post} actionsDisabled />
    </div>
  );
};

export default PostRoute;
