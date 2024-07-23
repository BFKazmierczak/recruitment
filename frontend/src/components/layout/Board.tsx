import { PostType } from '@/src/shared/types';
import '@/src/styles/main.scss';

import Post from './Post';

interface BoardProps {
  posts: PostType[];
}

const Board = ({ posts }: BoardProps) => {
  return (
    <div className="board">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Board;
