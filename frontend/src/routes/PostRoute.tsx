import { useLoaderData } from 'react-router-dom';

import { Post } from '../components/layout';
import { PostType } from '../shared/types';

const PostRoute = () => {
  const post = useLoaderData() as PostType;

  return (
    <div className="route">
      <Post post={post} />
    </div>
  );
};

export default PostRoute;
