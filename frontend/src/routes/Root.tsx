import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Board } from '@/src/components/layout';
import '@/src/styles/main.scss';

import { PostType } from '../shared/types';

const Root: FC = () => {
  const { posts } = useLoaderData() as { posts: PostType[] };

  return (
    <div className="route">
      <h2>Dive in...</h2>
      <Board posts={posts} />
    </div>
  );
};

export default Root;
