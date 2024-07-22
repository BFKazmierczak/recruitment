import { PostType } from '@/src/shared/types';
import '@/src/styles/main.scss';

import Post from './Post';

const posts: PostType[] = [
  {
    postId: 'aaa',
    author: 'Test User 1',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse turpis risus, aliquam ut lorem nec, commodo porta sapien. Morbi lobortis arcu sapien, sit amet tempus augue dignissim eget. Proin lacinia finibus sapien et faucibus. Maecenas vel felis aliquam, feugiat quam id, scelerisque magna. Etiam iaculis nisl dolor, ut feugiat mauris ornare eget.',
    created: 1,
    edited: 2,
  },
  {
    postId: 'aab',
    author: 'Test User 2',
    body: 'Ut sed accumsan dui. Nam tincidunt ligula id urna ornare, eget sollicitudin turpis elementum. Donec lacus nisl, imperdiet ut fermentum a, commodo quis orci. Sed pulvinar in purus ut aliquam. Nam convallis massa ac eros pharetra egestas. Sed non lorem a lorem imperdiet pulvinar a sed nulla. Sed quis massa at sem venenatis hendrerit tempor id dui. Phasellus in nisl ex. Curabitur eget ligula nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur arcu ac leo gravida,',
    created: 1,
    edited: 2,
  },
  {
    postId: 'aac',
    author: 'Test User 2',
    body: 'Ut sed accumsan dui. Nam tincidunt ligula id urna ornare, eget sollicitudin turpis elementum. Donec lacus nisl, imperdiet ut fermentum a, commodo quis orci. Sed pulvinar in purus ut aliquam. Nam convallis massa ac eros pharetra egestas. Sed non lorem a lorem imperdiet pulvinar a sed nulla. Sed quis massa at sem venenatis hendrerit tempor id dui. Phasellus in nisl ex. Curabitur eget ligula nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur arcu ac leo gravida,',
    created: 1,
    edited: 2,
  },
];

const Board = () => {
  return (
    <div className="board">
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default Board;
