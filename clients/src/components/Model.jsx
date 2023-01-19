import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx"
import { useEffect } from 'react';
import { searchUsers } from '../apis/auth';
import { addToGroup, removeUser, renameGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  minHeight: 300,
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
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = async (e) => {
    if (members.includes(e)) {
      return
    }
    await addToGroup({ userId: e?._id, chatId: activeChat?._id })
    setMembers([...members, e])

  }
  const searchChange = async () => {
    setIsLoading(true)
    const { data } = await searchUsers(search)
    setSearchResults(data)
    setIsLoading(false)
  }
  const updateBtn = async () => {
    let data = await renameGroup({ chatId: activeChat._id, chatName: name })
    if (data) {
      dispatch(fetchChats())
      setOpen(false)
    }
    return
  }
  const deleteSelected = async (ele) => {
    const res = await removeUser({ chatId: activeChat._id, userId: ele._id })
    if (res._id) {
      setMembers(members.filter((e) => e._id != ele._id))

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
    setMembers(...members, activeChat.users.map((e) => e))
  }, [])
  useEffect(() => {
    searchChange()
  }, [search])
  return (
    <>




      <button onClick={handleOpen}>
        <img className='w-[45px] h-[40px] rounded-[25px]' src={activeChat?.isGroup ? activeChat.photo : activeChat?.users[0]?._id === activeUser?.id ? activeChat?.users[1]?.profilePic : activeChat?.users[0]?.profilePic} />

      </button>
      {
        activeChat.isGroup ?

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h5 className='text-[22px] font-semibold tracking-wide text-center text-[#111b21]'>Shakir Farhan</h5>
              <div>
                <h6 className='text-[14px] text-[#111b21] tracking-wide font-semibold'>Members</h6>
                <div className='flex flex-wrap gap-y-2'>
                  {
                    members?.map((e) => {
                      return (
                        <button button className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400' >
                          <span className='text-[10px]'>{e.name}</span>
                          <RxCross2 onClick={() => deleteSelected(e)} />
                        </button>
                      )
                    })
                  }
                </div>
                <div>
                  <form className='mt-5 flex flex-col gap-y-3' onSubmit={(e) => e.preventDefault()}>
                    <input onChange={(e) => setName(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
                    <input onChange={(e) => setSearch(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
                  </form>
                  <div style={{ display: search ? "" : "none" }} className='h-[fit-content]  w-[94%] bg-[#fff] flex flex-col gap-y-3 pt-3 px-2'>

                    {
                      isLoading ? <div>Loading</div> : (

                        searchResults?.map((e) => {
                          return (
                            <div key={e._id} className='flex items-center justify-between'>
                              <div className='flex items-center gap-x-2'>

                                <img className='w-[42px] h-[42px] rounded-[25px]' src={!e.profilePic ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" : e.profilePic} alt="" />
                                <div className='flex flex-col gap-y-[1px]'>
                                  <h5 className='text-[15px] text-[#111b21] tracking-wide font-medium'>{e.name}</h5>
                                  <h5 className='text-[12px] text-[#68737c] tracking-wide font-normal'>{e.email}</h5>
                                </div>
                              </div>
                              <button onClick={() => handleClick(e)} className='bg-[#0086ea] px-3 py-2 text-[10.6px] tracking-wide text-[#fff]'>Add</button>
                            </div>
                          )
                        })
                      )

                    }
                  </div>
                  <div className='flex justify-end gap-x-3 mt-3'>
                    <button onClick={updateBtn} className='bg-[#0086ea] transition hover:bg-[#00A1C9]  px-4 py-1 text-[10.6px] tracking-wide text-[#fff]'>Update</button>
                    <button onClick={() => leaveGroup()} className='bg-[#880808] hover:bg-[#A52A2A] transition delay-150 px-4 py-1 text-[10.6px] tracking-wide text-[#fff]'>Leave</button>

                  </div>
                </div>
              </div>
            </Box>
          </Modal> : ""
      }




    </>
  )
}

export default Model