import React, { useEffect } from 'react';
import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { useState, useRef } from 'react';
import useChatContext from '../Contact/ChatContact';
import { useNavigate } from 'react-router';
import { baseURL } from '../Config/Axioshelper';
import SockJS from 'sockjs-client';
import toast from 'react-hot-toast';
import {Client} from "@stomp/stompjs";
import { getMessages } from '../Services/RoomService';
import { timeAgo } from '../Config/helper';
import avtarIcon from "../assets/avtar1.avif"
const Chatpage = () => {


   const {roomId,currentUser,connected,setConnected,setRoomId,setCurrentUser} = useChatContext();
   

   const navigate = useNavigate()
   useEffect(()=>{
    if(!connected){
    navigate('/')
    }
  },[connected,roomId,currentUser]);
    const [message,setMessage] = useState([{
    }]);
    const [input,setInput] = useState("");
    const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient,setStompClient] = useState(null);

    //message ko load krne honge 
    useEffect(()=>{
      async function loadMessage() {
        try{
           const messages = await getMessages(roomId)
           console.log(messages)
           setMessage(messages)
        }catch(error) { }
      }
      if(connected){
        loadMessage()
      }
    },[])

    // scroll down
    useEffect(()=>{
      chatBoxRef.current.scroll({
        top:chatBoxRef.current.scrollHeight,
        behavior :'smooth'
      });
    },[message]);
    // stomp client ko init krna or subscribe krna 
    useEffect(() => {
      const connectWebsocket = () => {
          // Create SockJS instance
          const sock = new SockJS(`${baseURL}/chat`);
          // Use Client instead of Stomp
          const client = new Client({
              webSocketFactory: () => sock,
              reconnectDelay: 5000, // Automatically reconnect if disconnected
              onConnect: () => {
                  setStompClient(client);
                  toast.success("Connected");
  
                  client.subscribe(`/topic/room/${roomId}`, (message) => {
                      console.log(message);
                      const newMessage = JSON.parse(message.body);
                      setMessage((prev) => [...prev, newMessage]);
                  });
              },
              onStompError: (frame) => {
                  console.error("Broker reported error:", frame.headers["message"]);
                  console.error("Additional details:", frame.body);
              },
          });
  
          client.activate(); // Connect to WebSocket
  
          return () => {
              client.deactivate(); // Cleanup on unmount
          };
      };
      if(connected){
      connectWebsocket();
      }
  }, [roomId]);
  
// send Message
const sendMessage = async ()=>{
  if(stompClient && connected && input.trim())
  {
      console.log("roomId before sending ",roomId);
      console.log(input);
      const message={
        sender:currentUser,
        content:input,
        roomId :roomId
      }
      console.log("Final message object before sending:", message);
      stompClient.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify(message),
    });
    setInput("")
  }
}

function handleLogout(){
  
  setConnected(false)
  navigate('/')
  toast.error("disconnected")
  setRoomId("")
  setCurrentUser("")
} 
  return (
    <div>
      <header className='dark:border-gray-700 fixed w-full h-16 dark:bg-gray-900 py-3 shadow flex justify-around'>
        {/* Room name container */}
        <div>
          <h1 className='text-2xl font-semibold'>
            Room : <span> {roomId}</span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className='text-2xl font-semibold'>
            User : <span> {currentUser}</span>
          </h1>
        </div>
        {/* Leave Room button */}
        <div>
          <button onClick={handleLogout} className='dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full'>
            Leave Room
          </button>
        </div>
      </header>

       <main ref={chatBoxRef} className='py-20 px-10 border w-3/4 dark:bg-slate-600 mx-auto h-screen overflow-auto'>
       {message.map((message,index)=>(
        <div  key={index} className={`flex ${message.sender==currentUser?'justify-end':'justify-start' }`}>
             <div key={index} className={`my-2 ${message.sender==currentUser ? 'bg-blue-600' : 'bg-green-600'} p-2 rounded max-w-xs`}>
                     <div className='flex flex-row gap-2'>
                        <img src={avtarIcon} alt='' className='h-10 w-10'/>
                     <div className=' flex flex-col gap-1'>
                        <p className='text-sm font-bold'>{message.sender}</p>
                        <p>{message.content}</p>
                     </div>
                     </div>
                </div>
        </div>
               
            ))}
       </main>
      {/* Input message container */}
      <div className='fixed bottom-5 w-full h-14'>
        <div className='h-full flex items-center justify-between rounded-full w-2/3 mx-auto dark:bg-gray-900 '>
          <input
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevents new line in input
                sendMessage();
              }
            }}
            type='text'
            placeholder='Type your message here...'
            className='dark:border-gray-600 dark:bg-gray-800 px-3 py-2 w-full mr-3 rounded-full h-full focus:outline-none'
          />
          <div className='flex items-center gap-2'>
            {/* Attach File Button */}
            <button  className='dark:bg-blue-600 h-10 w-10 flex items-center justify-center rounded-full'>
              <MdAttachFile size={20} />
            </button>
            {/* Send Button */}
            <button onClick={sendMessage} className='dark:bg-green-600 h-10 w-10 flex items-center justify-center rounded-full'>
              <IoMdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
