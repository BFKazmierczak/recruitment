import { useSelector } from 'react-redux';

import '@/src/styles/main.scss';

import { RootState } from '../state/store';

const Bookmarks = () => {
  const { data } = useSelector((state: RootState) => state.bookmarks);

  return (
    <div className="route">
      <h2>My Bookmarks</h2>
      {data.map((bookmark) => (
        <span key={bookmark.id}>{bookmark.name}</span>
      ))}
    </div>
  );
};

export default Bookmarks;
