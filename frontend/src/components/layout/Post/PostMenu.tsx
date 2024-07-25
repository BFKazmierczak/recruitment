import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import { MenuProps } from '@mui/material';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  SxProps,
} from '@mui/material';

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: 200,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface PostMenuProps extends MenuProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCopyUrl: () => void;
}

const PostMenu = ({ onClose, onEdit, onDelete, onCopyUrl, ...props }: PostMenuProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleEdit() {
    onEdit();
    onClose();
  }

  function handleDelete() {
    setModalOpen(true);
    onClose();
  }

  function handleUrlCopy() {
    onCopyUrl();
    onClose();
  }

  return (
    <>
      <Menu {...props}>
        <MenuItem onClick={handleUrlCopy}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy URL</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <h5>Are you sure want to delete the post?</h5>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  size="small"
                  onClick={() => {
                    setModalOpen(false);
                    onDelete();
                  }}
                >
                  Yes, delete the post
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  size="small"
                  onClick={() => setModalOpen(false)}
                >
                  No, go back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PostMenu;
