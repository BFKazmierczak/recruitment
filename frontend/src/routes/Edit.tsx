import { useLoaderData, useParams } from 'react-router-dom';

import '@/src/styles/main.scss';

import { PostForm } from '../components/forms';
import { PostType } from '../shared/types';

const Edit = () => {
  const post = useLoaderData() as PostType;

  return (
    <div className="route">
      <h2>Editing post {post.id}</h2>
      <PostForm editing initialContent={post.content} />
    </div>
  );
};

export default Edit;
