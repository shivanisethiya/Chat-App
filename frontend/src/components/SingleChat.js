// import React from 'react'
// import { ChatState, useChatState } from '../Context/ChatProvider'
// import { Box, IconButton, Text } from '@chakra-ui/react';
// import { ArrowBackIcon } from '@chakra-ui/icons';
// import {getSender} from "../components/config/ChatLogics";
// const SingleChat = ({fetchAgain,setFetchAgain}) => {
//   const [user,selectedChat,setSelectedchat]=useChatState();
//   console.log({ user, selectedChat, setSelectedchat });
//     return <>
//            {
//             selectedChat ? (<>

//                <Text
//                 fontSize={{base:"28px" ,md:"30px"}}
//                 pb={3}
//                 px={2}
//                 w="100%"
//                 fontFamily="Work sans"
//                 display="flex"
//                justifyContent={{base:"space-between"}}
//                alignItems="center"
//                >
//                <IconButton
//                 display={{base:"flex",md:"none"}}
//                 icon={<ArrowBackIcon/>}
//                 onClick={()=>setSelectedchat("")}
//                />

//                {
//                     !selectedChat.isGroupChat ? (
//                          <>
//                               {getSender(user,selectedChat.users)}
//                          </>
//                     ):(
//                          <>
//                               {selectedChat.chatName.toUpperCase()}
//                               {/* <UpdateGroupChatModal
//                                    fetchAgain={fetchAgain}
//                                    setFetchAgain={setFetchAgain}
//                               /> */}
//                          </>
//                     )
//                }
                  
//                </Text>






//             </>):(
//                  <Box display="flex"
//                    alignItems="center"
//                    justifyContent="center"
//                    h="100%"
//                  >
//                       <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//                            Click on a user to start chating
//                       </Text>
//                  </Box>
//             )
//            }

//     </>
// }

// export default SingleChat;


import React, { useEffect, useState } from 'react';
import { useChatState } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from "../components/config/ChatLogics";
import ProfileModel from './miscelleneous/ProfileModel';
import UpdateGroupChatModal from './miscelleneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import './styles.css';
// import { sendMessage } from '../../../Backend/controllers/messagecontrollers';
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
      
   const [messages,setMessages]=useState([]);
   const [loading,setLoading]=useState(false);
   const [newMessage,setNewMessage]=useState();
   const toast=useToast();
  const { user, selectedChat, setSelectedChat } = useChatState(); // Corrected hook usage
 
   const fetchMessages=async()=>{
    if(!selectedChat) return;

    try {
      
        const config={
         headers:{
           Authorization:`Bearer ${user.token}`,
         },
        };
         setLoading(true);
        const {data}=await axios.get(`/api/message/${selectedChat._id}`,config); 
         console.log(messages);
        setMessages(data);
        setLoading(false);
   
      } catch (error) {
        toast({
          title:"Error occured!",
          description:"Failed to load the message",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom",
        })
    }
   };
 
  useEffect(()=>{
      fetchMessages();
  },[selectedChat])

  const sendMessage=async(event)=>{
    if(event.key==="Enter"&&newMessage){
       try {
           const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${user.token}`,
            },
           };
           setNewMessage("");
           const {data}=await axios.post("/api/message",{
            content:newMessage,
            chatId:selectedChat._id,
           },config);
          console.log(data);
         setMessages([...messages,data]);
       } catch (error) {
          toast({
            title:"Error occured!",
            description:"Failed to send the message",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom",
          })
       }   
    }
  };


  const typingHandler=(e)=>{
    setNewMessage(e.target.value);

  };



  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)} // Changed to null for better practice
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)} {/* Adjusted to access users */}
                <ProfileModel user={getSenderFull(user, selectedChat.users)}/>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
              </>
            )}
          </Text>
            
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >

              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
                 ):(
                  <div className='messages'>
                     <ScrollableChat messages={messages}/>
                  </div>
                 )}   
               <FormControl
                onKeyDown={sendMessage} isRequired mt={3}
               >
               <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter A message...."
                  onChange={typingHandler}
                  value={newMessage}
               />
                    
               </FormControl>

            </Box>


        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
