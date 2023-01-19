import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';
import Model from '../components/Model';
import { BsEmojiSmile } from "react-icons/bs"
import { fetchMessages, sendMessage } from '../apis/messages';
import { useEffect } from 'react';
import MessageHistory from '../components/MessageHistory';
function Chat(props) {
  const { activeChat } = useSelector((state) => state.chats)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const activeUser = useSelector((state) => state.activeUser)
  const keyDownFunction = async (e) => {
    if (e.key === "Enter" && message) {
      const data = await sendMessage({ chatId: activeChat._id, message })
      console.log(data)
      setMessages([...messages, data])
      setMessage("")
    }
  }
  const fetchMessagesFunc = async () => {

    if (activeChat) {
      const data = await fetchMessages(activeChat._id)
      setMessages(data)
    }
    return
  }
  useEffect(() => {
    fetchMessagesFunc()
  }, [activeChat])
  return (
    <>
      {
        activeChat ?
          <div className={props.className}>
            <div className='flex justify-between items-center border-b-2 px-5 bg-[#ffff] h-[61px]'>
              <div className='flex flex-col items-start justify-center'>

                <h5 className='text-[15px] text-[#0e1114] font-semibold tracking-wider'>{activeChat?.isGroup ? activeChat?.chatName : activeChat?.users[0]?._id === activeUser.id ? activeChat?.users[1]?.name : activeChat?.users[0]?.name}</h5>
                <p className='text-[11px] text-[#aabac8]'>Last seen 5 min ago</p>
              </div>
              <div>
                <Model />
              </div>
            </div>
            <div style={{ scrollbarWidth: "none" }} className='scrollbar-hide w-[100%] h-[91.3vh] md:h-[83vh] flex flex-col overflow-y-scroll p-4'>
              <MessageHistory messages={messages} />
            </div>
            <div className='absolute top-[79vh] right-[25%] left-[18%] sm:left-[23%] md:left-[50%]  lg:left-[48%]'>
              <div className='border-[1px] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] h-[50px] lg:w-[400px] rounded-t-[10px]'>
                <form onKeyDown={(e) => keyDownFunction(e)} onSubmit={(e) => e.preventDefault()}>
                  <input onChange={(e) => setMessage(e.target.value)} className='focus:outline-0 w-[100%]' type="text" name="message" placeholder="Enter message" value={message} />
                </form>

              </div>

              <div className='border-x-[1px] border-b-[1px] bg-[#f8f9fa] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] lg:w-[400px] rounded-b-[10px] h-[50px]'>
                <div className='flex justify-between items-start'>
                  <BsEmojiSmile style={{ width: "20px", height: "20px" }} />
                  <button className='bg-[#f8f9fa] border-[2px] border-[#d4d4d4] text-[14px] px-2 py-[3px] text-[#9e9e9e] font-medium rounded-[7px] -mt-1'>Send</button>
                </div>
              </div>
            </div>
          </div> :
          <div className={props.className}>
            <div className='relative'>
              <div className='absolute top-[40vh] text-[#111b21] left-[38%] text-[20px] font-medium tracking-wider'>Click On User To Start Chatting</div>
            </div>
          </div>

      }
    </>
  )
}

export default Chat