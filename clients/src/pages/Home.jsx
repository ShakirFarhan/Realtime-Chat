import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchUsers, validUser } from '../apis/auth'
import { setActiveUser } from '../redux/activeUserSlice'
import { RiNotificationBadgeFill } from "react-icons/ri"
import logo from "../assets/logo.png"
import { BsSearch } from "react-icons/bs"
import { BiNotification } from "react-icons/bi"
import { IoIosArrowDown } from "react-icons/io"
import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
import Chat from './Chat'
import Profile from "../components/Profile"
import { acessCreate } from "../apis/chat.js"
import "./home.css"
import { fetchChats } from '../redux/chatsSlice'
import { timeSince } from '../utils/logics'
import { setActiveChat } from '../redux/chatsSlice'
import Group from '../components/Group'
import Loading from '../components/Loading'
var aDay = 24 * 60 * 60 * 1000;

function Home() {
  const dispatch = useDispatch()
  const pageRoute = useNavigate()
  const { showProfile, showNotifications } = useSelector((state) => state.profile)
  const { chats, activeChat } = useSelector((state) => state.chats)
  const activeUser = useSelector((state) => state.activeUser)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const handleSearch = async (e) => {
    setSearch(e.target.value)
  }
  const searchChange = async () => {
    setIsLoading(true)
    const { data } = await searchUsers(search)
    setSearchResults(data)
    setIsLoading(false)
  }

  useEffect(() => {
    searchChange()
  }, [search])
  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()

      if (!data?.user) {
        pageRoute("/login")
      }
      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic,
        bio: data?.user?.bio,
        name: data?.user?.name
      }
      dispatch(setActiveUser(user))
    }
    isValid()

  }, [])
  return (

    <>

      <div style={{ background: "#d8dbdc", background: "linear-gradient(0deg, #d8dbdc 87%, #00a884 87%)" }} className="w-[100%] h-[100vh] z-10">

        <div className='flex md:container md:mx-auto  md:pt-7 h-[96vh]' >
          {
            !showProfile ?
              <div className={`${activeChat ? "hidden md:flex md:flex-col min-w-[100%] sm:min-w-[360px]  h-[100vh] md:h-[91.6vh]   bg-[#ffff] relative" : "min-w-[100%] sm:min-w-[360px]  h-[100vh] md:h-[91.6vh]   bg-[#ffff] relative"} `}>

                <div className='h-[61px]  px-4 border-b-2 border-r-2'>
                  <div className='flex'>
                    <a className='flex items-center relative -top-4 -left-12 block h-[90px]' href=''>
                      <img className="w-32 h-[100px]" src={logo} alt="" />
                      <h3 className='text-[19px] text-[#111b21] font-body font-semibold  tracking-wide -ml-12'>K-Message</h3>
                    </a>
                  </div>
                  <div className='absolute top-4 right-5 flex items-center gap-x-3'>
                    <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
                      {
                        showNotifications ? <RiNotificationBadgeFill style={{ width: "25px", height: "25px" }} /> : <BiNotification style={{ color: "#616c76", width: "25px", height: "25px" }} />
                      }

                    </button>
                    <button onClick={() => dispatch(setShowProfile(true))} className='flex items-center gap-x-1 relative'>
                      <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="" />
                      <IoIosArrowDown style={{ color: "#616c76", height: "14px", width: "14px" }} />
                    </button>
                  </div>
                </div>

                <div className='border-r-2'>

                  <div className='-mt-1 relative pt-6 px-4'>
                    <form onSubmit={(e) => e.preventDefault()}>

                      <input onChange={handleSearch} className='w-[99.5%] bg-[#ffff] border-[#cdd5de]  text-[#000000] tracking-wider border-2 pl-9 py-[4px] rounded-[9px]' type="text" name="search" placeholder="Search" />

                    </form>

                    <div className='absolute top-[33px] left-[27px]'>
                      <BsSearch style={{ color: "#cdd5de" }} />
                    </div>
                    <Group />

                    <div style={{ display: search ? "" : "none" }} className='h-[70vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#fff] flex flex-col gap-y-3 pt-3 px-4'>

                      {
                        isLoading ? <Loading className="flex flex-col -space-y-5" /> : (

                          searchResults?.map((e) => {
                            return (
                              <div key={e._id} className='flex items-center justify-between'>
                                <div className='flex items-center gap-x-2'>

                                  <img className='w-[42px] h-[42px] rounded-[25px]' src={!e.profilePic ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : e?.profilePic} alt="" />
                                  <div className='flex flex-col gap-y-[1px]'>
                                    <h5 className='text-[15px] text-[#111b21] tracking-wide font-medium'>{e.name}</h5>
                                    <h5 className='text-[12px] text-[#68737c] tracking-wide font-normal'>{e.email}</h5>
                                  </div>
                                </div>
                                <button onClick={async () => {
                                  await acessCreate({ userId: e._id })
                                  setSearch("")
                                }} className='bg-[#0086ea] px-3 py-2 text-[10.6px] tracking-wide text-[#fff]'>Add</button>
                              </div>
                            )
                          })
                        )

                      }
                    </div>
                  </div>


                  <div className='flex flex-col -space-y-1 overflow-y-scroll mt-0 h-[70vh] scrollbar-hide'>
                    {
                      chats?.map((e) => {
                        return (
                          <div onClick={() => dispatch(setActiveChat(e))} key={e._id} className={`flex items-center justify-between sm:gap-x-1 md:gap-x-1 mt-5 ${activeChat._id === e._id ? "bg-[#f0f2f5]" : "bg-[#fff]"} cursor-pointer  py-4 px-2`}>
                            <div className='flex items-center gap-x-3 sm:gap-x-1 md:gap-x-3'>
                              <img className='w-12 h-12  sm:w-12 sm:h-12 rounded-[30px] shadow-lg object-cover' src={!e.isGroup ? e.users[0]._id === activeUser.id ? e.users[1]?.profliePic : e.users[0]?.profilePic : e?.photo} alt="" />
                              <div>
                                <h5 className='text-[13.6px] sm:text-[16px] text-[#111b21] font-medium'>{!e.isGroup ? e.users[0]._id === activeUser.id ? e.users[1]?.name : e.users[0]?.name : e?.chatName}</h5>
                                <p className='text-[13.6px] sm:text-[13.5px] font-normal text-[#68737c] '>Hey bro whats going on</p>
                              </div>
                            </div>
                            <div className='flex flex-col items-end gap-y-[5px]'>
                              <p className='text-[12.4px] sm:text-[12px]  font-normal text-[#778592] tracking-wide'>{timeSince(new Date(Date.parse(e.updatedAt) - aDay))}</p>
                              <p className='text-[12.4px] sm:text-[12px]  rounded-[20px] px-[6px]  bg-[#778592] font-bold text-[#ffff] w-[19px]'>2</p>
                            </div>
                          </div>
                        )
                      })

                    }
                  </div>

                </div>


              </div> : <Profile className="min-w-[100%] sm:min-w-[360px] h-[100vh] md:h-[91.6vh] c bg-[#f0f2f5] relative" />
          }
          {/*  */}
          <Chat className="block w-[100%] md:w-[77%] bg-[#ffff] h-[100vh] md:h-[91.6vh] " />




        </div>
      </div >

    </>
  )
}

export default Home