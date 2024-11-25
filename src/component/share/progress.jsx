import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({value}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate"  />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${value}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({contentNumber}) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  }, [contentNumber]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
