// import {createContext, useContext, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const ChatContext=createContext();
// const ChatProvider=({children})=>{
//     const [user,setUser]=useState();
//     const [selectedChat,setSelectedChat]=useState();
//     const [chats,setChats]=useState([]);
//     const navigate=useNavigate();
//      useEffect(()=>{
//        const userinfo=JSON.parse(localStorage.getItem("userInfo"));
//         setUser(userinfo);
//         if(!userinfo)
//         {
//              navigate("/");
//         } 
//     },[navigate]);
   

//     return(
//         <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}} >
//               {children}
//         </ChatContext.Provider>
//     )
// };
//  export const useChatState=()=>{
//     return useContext(ChatContext);
//  }



// export default ChatProvider;

import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats,notification,setNotification}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;

