import React , {useState , useEffect } from 'react'
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io.connect("http://localhost:5000")
    
export default function App() {
  const [msg , setmsg] = useState();
  const [chat , setchat] = useState([]);

  const sendChat = (e)=>{
    e.preventDefault();
    socket.emit("chat" , {msg});
    setmsg('')
 }

 useEffect(()=>{
  socket.on("chat" , (payload)=>{
    setchat([...chat , payload]);
  })
 })  


  return (
    <div >
      {
        chat && chat.map((msg)=>(
          <div>
              {msg.msg}
            </div>
        ))
      }
      <input type='text' placeholder='"enter msg' value={msg}  onChange={(e)=>{setmsg(e.target.value)}}/>
      <button type='submit' onClick = {sendChat}>send</button>
    </div>
  )
}

