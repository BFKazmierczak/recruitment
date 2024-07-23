import '@/src/styles/main.scss';

import { PostForm } from '../components/forms';

const Add = () => {
  return (
    <div className="route">
      <h2>What's on your mind?</h2>
      <PostForm />
    </div>
  );
};

export default Add;
