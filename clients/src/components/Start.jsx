import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validUser } from '../apis/auth'
function Start() {
  const dispatch = useDispatch()
  const { activeUser } = useSelector((state) => state)
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

  }, [dispatch, activeUser])
  return (
    <div className='bg-[#fff]'>
      validating
    </div>
  )
}

export default Start