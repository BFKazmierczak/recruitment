import { ReactNode } from 'react';

import { Backdrop, Box, Button, Fade, Grid, Modal, SxProps } from '@mui/material';

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

interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

/**
 * CustomModal Component
 *
 * Wrapper for MUI Modal component
 *
 * @component
 * @prop {ReactNode} children
 * @prop {boolean} open - indicates if modal is open
 * @prop {function} [onClose] - callback fired when closed
 */
const CustomModal = ({ children, open, onClose }: CustomModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
