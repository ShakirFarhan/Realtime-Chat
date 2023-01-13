import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validUser } from '../apis/auth'
import { getActiveUser, setActiveUser } from '../redux/activeUserSlice'
function Home() {
  // const { id } = useSelector((state) => state.activeUser)
  const dispatch = useDispatch()
  const pageRoute = useNavigate()

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()
      if (!data?.user) {
        pageRoute("/login")
      }
      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic
      }
      dispatch(setActiveUser(user))
    }
    isValid()
  }, [])
  return (
    <div className='w-[320px] bg-[#4A545C]'>

    </div>
  )
}

export default Home