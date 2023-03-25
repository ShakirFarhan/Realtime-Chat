import React from 'react'

function Typing({ className, width, height }) {
  return (
    <div className={className}>
      <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_xxgrirnx.json" background="transparent" speed="1" style={{ width: `${width}px`, height: `${height}px` }} loop autoplay></lottie-player>
    </div>
  )
}

export default Typing