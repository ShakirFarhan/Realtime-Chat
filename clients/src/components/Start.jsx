import React, { useEffect } from 'react'
import { validUser } from '../apis/auth'
function Start() {
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()

      if (!data?.user) {
        window.location.href = "/login"
      }
      else {
        window.location.href = "/chats"
      }

    }
    isValid()

  }, [])
  return (
    <div className='bg-[#fff] flex items-center justify-center w-[100vw] h-[100vh]'>
      <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_kanwuonz.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player>
    </div>
  )
}

export default Start