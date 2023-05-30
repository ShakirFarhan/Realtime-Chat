import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx"
import { useEffect } from 'react';
import { searchUsers } from '../apis/auth';
import { addToGroup, removeUser, renameGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import Search from './group/Search';
import { getChatName, getChatPhoto } from '../utils/logics';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};
function Model(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [searchResults, setSearchResults] = useState([])
  const [name, setName] = useState("")
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState([])
  const { activeChat } = useSelector((state) => state.chats)
  const activeUser = useSelector((state) => state.activeUser)

  const handleOpen = () => {
    setOpen(true);
    setName(getChatName(activeChat, activeUser))
  };
  const handleClose = () => {
    setOpen(false);
    setSearch("")
    setSearchResults([])
  };
  const handleClick = async (e) => {
    if (members.includes(e)) {
      return
    }
    await addToGroup({ userId: e?._id, chatId: activeChat?._id })
    setMembers([...members, e])

  }

  const updateBtn = async () => {
    if (name) {
      let data = await renameGroup({ chatId: activeChat._id, chatName: name })
      if (data) {
        dispatch(fetchChats())
        setOpen(false)
      }
    }
    setOpen(false)
  }
  const deleteSelected = async (ele) => {
    const res = await removeUser({ chatId: activeChat._id, userId: ele._id })
    if (res._id) {
      setMembers(members.filter((e) => e._id !== ele._id))

      dispatch(fetchChats())
      setOpen(false)

    }
    return
  }
  const leaveGroup = async () => {
    const res = await removeUser({ chatId: activeChat._id, userId: activeUser.id })
    if (res._id) {
      dispatch(fetchChats())
      setOpen(false)
    }
    return
  }
  useEffect(() => {
    setMembers(activeChat?.users.map((e) => e))
  }, [activeChat])
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true)
      const { data } = await searchUsers(search)
      setSearchResults(data)
      setIsLoading(false)
    }
    searchChange()
  }, [search])
  return (
    <>




      <button onClick={handleOpen}>
        <img className='w-[40px] h-[40px] rounded-[25px]' alt="Profile Pic" src={getChatPhoto(activeChat, activeUser)} />

      </button>
      {
        activeChat?.isGroup ?

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h5 className='text-[22px] font-semibold tracking-wide text-center text-[#111b21]'>{getChatName(activeChat, activeUser)}</h5>
              <div>
                <h6 className='text-[14px] text-[#111b21] tracking-wide font-semibold'>Members</h6>
                <div className='flex flex-wrap gap-y-2'>
                  {
                    members.length > 0 && members?.map((e) => {
                      return (
                        <button button className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400' >
                          <span className='text-[10px]'>{e._id === activeUser.id ? "You" : e.name}</span>
                          <RxCross2 onClick={() => deleteSelected(e)} />
                        </button>
                      )
                    })
                  }
                </div>
                <div>
                  <form className='mt-5 flex flex-col gap-y-3' onSubmit={(e) => e.preventDefault()}>
                    <input onChange={(e) => setName(e.target.value)} value={name} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
                    <input onChange={(e) => setSearch(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
                  </form>
                  {/* <div style={{ display: search ? "" : "none" }} className='h-[fit-content] bg-[#fff] flex flex-col gap-y-3 pt-3 px-2'> */}

                  <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />

                  <div className='flex justify-end gap-x-3 mt-3'>
                    <button onClick={updateBtn} className='bg-[#0086ea] transition hover:bg-[#00A1C9]  px-4 py-1 text-[10.6px] tracking-wide text-[#fff]'>Update</button>
                    <button onClick={() => leaveGroup()} className='bg-[#880808] hover:bg-[#A52A2A] transition delay-150 px-4 py-1 text-[10.6px] tracking-wide text-[#fff]'>Leave</button>

                  </div>
                </div>
              </div>
            </Box>
          </Modal> : <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='w-[250px] h-[250px] flex flex-col items-center justify-center -mt-4'>
                <img className='w-[70px] h-[70px] rounded-[35px] shadow-lg' src={getChatPhoto(activeChat, activeUser)} alt="" />
                <h2 className='text-[17px] tracking-wider font-semibold text-[#313439]'>{getChatName(activeChat, activeUser)}</h2>

                <h3 className='text-[14px] font-semibold text-[#268d61]'>{!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id ? activeChat?.users[1]?.email : activeChat?.users[0]?.email}</h3>
                <div className='flex flex-col items-start'>

                  <h5 className='text-[13px]'>{!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id ? activeChat?.users[1]?.bio : activeChat?.users[0]?.bio}</h5>
                </div>
              </div>


            </Box>
          </Modal>
      }




    </>
  )
}

export default Model