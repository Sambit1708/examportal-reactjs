import { Box } from '@mui/material'
import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const PreLoading = () => {
  return (
    <Box>
        <Box className='loading-screen'>
            <ThreeCircles
                visible={true}
                height="60"
                width="60"
                color="#2874f0"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        <Box sx={{ mt: 1 }}>
            <p style={{ fontWeight: "500" }}>Loading . . .</p>
        </Box>
        </Box>
    </Box>
  )
}

export default PreLoading