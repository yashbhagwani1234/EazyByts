import React, { useState } from 'react'
import chatIcon from "../assets/speak.png"
import toast from 'react-hot-toast';
import { createRoom, joinChatApi } from '../Services/RoomService';
import useChatContext from '../Contact/ChatContact';
import { useNavigate } from 'react-router';
const JoinCreateChat = () => {
  const [detail,setDetail] = useState({
    roomId:"",
    userName: "",
  });

  const {roomId,userName,setRoomId,setCurrentUser,setConnected}= useChatContext();
  const navigate = useNavigate()

  function handleFormInputChange(event){
    setDetail({
      ...detail,
      [event.target.name] :event.target.value,
    });
  }
  
  function validateForm(){
     if(detail.roomId == '' || detail.userName=='')
     {
      toast.error("Invalid Input !!")
      return false;
     }
     return true;

  }
  async function joinChat(){
      if(validateForm())
      {
        
          try{
            console.log("joining room ",detail.roomId)
            const room = await joinChatApi(detail.roomId)
            toast.success("joined...")
            setCurrentUser(detail.userName);
            setRoomId(detail.roomId);
            setConnected(true)
            navigate('/chat')
          }catch(error)
          {
            if(error.status==400)
            {
              toast.error(error.response.data);
            }
            else{
              toast.error("Error in joining room");
            }  

             console.log(error);
          }
      }
  }

 async function createChat(){
      if(validateForm())
      {
        console.log(detail);
        try{
        const response = await createRoom(detail.roomId)
        console.log(response)
        toast.success("Room Created Successfully !!");
        //join the room
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true)
        // forward to chatpage
        navigate('/chat')
        }
        catch(error)
        {
           console.log(error);
           if(error.status==400)
           {
            toast.error("Room Id already exits !!");
           }
           else{
             toast("Error in creating room");
           }
        }
      }
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-8 w-full flex flex-col gap-4 max-w-md rounded dark:bg-gray-900 shadow'>
        <div>
            <img src={chatIcon} className='w-24 mx-auto'/>
        </div>
        <h1 className='text-2xl text-center font-semibold'>Join Room / Create Room...</h1>
        {/* name div*/ }
        <div className=''>
           <label htmlFor='name' className='block font-medium mb-2'>
             Your name
           </label>
           <input onChange={handleFormInputChange} value={detail.userName}
           name='userName' placeholder='Enter the name ' type='text' id='userName' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        {/*room id div*/ }
        <div className=''>
           <label htmlFor='name' className='block font-medium mb-2'>
             Room ID / New Room ID
           </label>
           <input name='roomId' onChange={handleFormInputChange} value={detail.roomId} placeholder='Enter room id' type='text' id='roomId' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
        {/* Button*/ }
        <div className='flex justify-center gap-5 mt-4'>
            <button onClick={joinChat} className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full'>Join Room</button>
            <button onClick={createChat} className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full'>Create Room</button>
        </div>
        
      </div>
    </div>
  )
}

export default JoinCreateChat
