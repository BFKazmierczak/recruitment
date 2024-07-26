import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PostType } from '@/src/shared/types';
import { RootState } from '@/src/state/store';
import '@/src/styles/main.scss';

import Post from '../display/Post';

const Board = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: posts } = useSelector((state: RootState) => state.posts);

  return (
    <div className="board">
      {posts.map((post) => (
        <Post key={post.id} post={post} isOwner={post.author === user.email} />
      ))}
      {!posts.length && (
        <>
          <h3>No posts yet</h3>
          <h5>
            <Link to="/add">Add</Link> one now
          </h5>
        </>
      )}
    </div>
  );
};

export default Board;
