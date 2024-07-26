import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PostType } from '@/src/shared/types';
import { RootState } from '@/src/state/store';
import '@/src/styles/main.scss';

import Post from '../display/Post';

const Board = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: posts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    console.log('board rerendered');
  });

  return (
    <div className="board">
      {posts.map((post) => (
        <Post key={post.id} post={post} isOwner={post.author === user.email} />
      ))}
    </div>
  );
};

export default Board;
