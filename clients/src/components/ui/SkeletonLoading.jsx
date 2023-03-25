import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonLoading({ height, count }) {
  return (
    <div>
      <Skeleton style={{ height: `${height}px`, width: "100%" }} count={count} />
    </div>
  )
}

export default SkeletonLoading