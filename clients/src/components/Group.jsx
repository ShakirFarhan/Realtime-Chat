import React, { useState } from 'react'
import { BsPlusLg } from "react-icons/bs"
import Loading from './Loading';
import { Modal, Box, Typography } from "@mui/material"
import { searchUsers } from '../apis/auth';
import { RxCross2 } from "react-icons/rx"
import { useEffect } from 'react';
import { createGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 2

};
function Group() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUsers] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormSearch = async (e) => {
    setSearch(e.target.value)
  }
  const handleClick = (e) => {
    if (selectedUser.includes(e)) {
      return
    }
    setSelectedUsers([...selectedUser, e])
  }
  const searchChange = async () => {
    setIsLoading(true)
    const { data } = await searchUsers(search)
    setSearchResults(data)
    setIsLoading(false)
  }
  const deleteSelected = (ele) => {
    setSelectedUsers(selectedUser.filter((e) => e._id != ele._id))
  }
  const handleSubmit = async () => {
    const res = await createGroup({
      chatName,
      users: JSON.stringify(selectedUser.map((e) => e._id))
    })
    dispatch(fetchChats())
  }
  useEffect(() => {
    searchChange()
  }, [search])
  return (
    <>
      <button className='mt-1 transition duration-150 ease-in-out' onClick={handleOpen}>

        <div className='flex justify-start border-r-2'>
          <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f0f2f5] text-[#111b21] py-1 -mb-7 mt-2  px-2'>New Group <BsPlusLg /></button>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5 className='text-[18px] text-[#111b21] font-medium text-center'>Create A Group</h5>

          <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-y-3 mt-3'>

            <input onChange={(e) => setChatName(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
            <input onChange={handleFormSearch} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
            <div className='flex -mt-2'>

              {
                selectedUser?.map((e) => {
                  return (
                    <button onClick={() => deleteSelected(e)} className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
                      <span >{e.name}</span>
                      <RxCross2 />
                    </button>
                  )
                })
              }
            </div>
            <div style={{ display: search ? "" : "none" }} className='text-[#00000]  z-10 w-[100%] bg-[#fff] flex flex-col gap-y-3 pt-3 px-2'>

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
            <div className='flex justify-end mt-3'>
              <button onClick={handleSubmit} className='bg-[#0086ea] text-[#fff] text-[15px] font-medium px-2 py-1 tracking-wide' type='submit'>Create</button>
            </div>
          </form>


        </Box>
      </Modal>
    </>
  )
}

export default Group