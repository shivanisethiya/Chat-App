import React, { useEffect} from 'react';
import { useState } from 'react';
import axios from "axios";
const Chatpage = () => {
   const [chats,setChats]=useState([]);
  const fetchchats=async()=>{
    try{
      const response=await axios.get("/api/chat");
      setChats(response.data);
    }catch (error) {
      console.error("Error fetching chats:", error);
    }
      
  };

useEffect(()=>{
   fetchchats();
},[]);
return (
  <div>
    {chats.map((chat) => (
      <div key={chat.id}>{chat.chatName}</div>
    ))}
  </div>
);
};
export default Chatpage
