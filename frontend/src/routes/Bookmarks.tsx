import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '@/src/styles/main.scss';
import Bookmark from '@mui/icons-material/Bookmark';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { RootState } from '../state/store';

const Bookmarks = () => {
  const { data } = useSelector((state: RootState) => state.bookmarks);

  return (
    <div className="route">
      <h2>My Bookmarks</h2>

      {!data.length && (
        <>
          <h4>No bookmarks yet</h4>
          <Link to="/">Take me home</Link>
        </>
      )}

      {data.length > 0 && (
        <List>
          {data.map((bookmark) => (
            <ListItem key={bookmark.id}>
              <ListItemButton href={`/post/${bookmark.postId}`}>
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText>{bookmark.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Bookmarks;
