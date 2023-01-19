import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Loading(props) {
  return (
    <div className={props.className}>
      <Skeleton style={{ height: "100px" }} animation="wave" />
      <Skeleton style={{ height: "100px" }} animation="wave" />
      <Skeleton style={{ height: "100px" }} animation="wave" />
      <Skeleton style={{ height: "100px" }} animation="wave" />


    </div>
  )
}

export default Loading