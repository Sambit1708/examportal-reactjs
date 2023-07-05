import { Backdrop } from '@mui/material'
import * as React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loading = ({show}) => {
  return (
    <React.Fragment>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={show}
        >
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
      />
        </Backdrop>
    </React.Fragment>
  )
}

export default Loading