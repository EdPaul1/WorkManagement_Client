import React from 'react'
import { Typography, Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

const LinearProgressWithLabel = (props) => {
    return (
        <Box className='flex'>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant='determinate'
          {...props}
          sx={{
            backgroundColor: 'rgb(78 78 78 / 20%)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: props.barcolor,
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
    )
}
export default LinearProgressWithLabel