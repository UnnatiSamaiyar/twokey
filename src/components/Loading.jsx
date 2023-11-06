import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 flex justify-center items-center z-50">
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress style={{ color: '#1d4ed8' }} />
      </Box>
    </div>
  );
};

export default Loading;
