import React from 'react'
import { IoArrowBack } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { setShowProfile } from '../redux/profileSlice'
function Profile(props) {
  const dispatch = useDispatch()
  const { showProfile } = useSelector((state) => state.profile)
  const activeUser = useSelector((state) => state.activeUser)
  return (

    <div style={{ transition: showProfile ? "0.3s ease-in-out" : "" }} className={props.className}>
      <div className='absolute  w-[100%]'>
        <div className='bg-[#008069] pt-12 pb-3'>
          <button onClick={() => dispatch(setShowProfile(false))} className='flex items-center'>
            <IoArrowBack style={{ color: "#fff", width: "30px", height: "20px" }} />
            <h6 className='text-[16px] text-[#fff] font-semibold'>Profile</h6>
          </button>
        </div>
        <div className=' pt-5'>
          <div className='flex items-center flex-col'>
            <img className='w-[150px] h-[150px] rounded-[100%] -ml-5' src={activeUser?.profilePic} alt="" />
          </div>
          <div>
            <div className='flex flex-col py-4 mt-4 bg-[#ffff] shadow-md px-4 gap-y-3'>
              <p className='text-[12px] text-[#26937f] font-medium tracking-wide'>Your name</p>
              <p className='text-[14.5px] text-[#3b4a54]'>
                {activeUser?.name}
              </p>
            </div>
            <div className='py-5 px-4'>
              <p className='text-[10px] tracking-wide text-[#3b4a54] '>
                This is not your username or pin. This name will be visible to your k-Message contacts

              </p>
            </div>
            <div className='flex flex-col py-4 mt-4 bg-[#ffff] shadow-md px-4 gap-y-3'>
              <p className='text-[12px] text-[#26937f] font-medium tracking-wide'>Bio</p>
              <p className='text-[14.5px] text-[#3b4a54]'>
                {activeUser?.bio}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile