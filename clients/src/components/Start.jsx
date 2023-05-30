import React, { useEffect } from 'react'
import { validUser } from '../apis/auth'
import { useNavigate } from "react-router-dom"
function Start() {
  const pageRoute = useNavigate()
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()
      if (!data?.user) {
        pageRoute("/login")
      }
      else {
        pageRoute("/chats")

      }
    }
    isValid()

  }, [pageRoute])
  return (


    <div className='bg-[#fff] flex items-center justify-center w-[100vw] h-[100vh] flex items-center flex-col -gap-y-10'>
      <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_kanwuonz.json" background="transparent" speed="1" style={{ width: "300px", height: "260px" }} loop autoplay></lottie-player>
      <h3 className='font-semibold text-[13px] tracking-wider relative -top-16'>Please Wait. It Might take some time</h3>
    </div>

  )
}

export default Start