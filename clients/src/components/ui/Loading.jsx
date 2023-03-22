import React from 'react'

function Loading() {
  return (
    <div className='flex items-center justify-center h-[100vh] bg-[#fff]'>
      <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_cud2yjlq.json" background="transparent" speed="1" style={{ width: "150px", height: "150px" }} loop autoplay></lottie-player>
    </div>
  )
}

export default Loading