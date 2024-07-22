import { FC } from 'react';

import '@/src/styles/main.scss';
import { Box, Paper, Typography } from '@mui/material';

const App: FC = () => {
  return (
    <Box className="center">
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h6">Hello, please start here. 🙂</Typography>
      </Paper>
    </Box>
  );
};

export default App;
