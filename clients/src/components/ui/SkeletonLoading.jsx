import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonLoading({ classname, height, count }) {
  return (
    <div>
      <Skeleton style={{ height: height, width: "100%" }} count={count} />
    </div>
  )
}

export default SkeletonLoading