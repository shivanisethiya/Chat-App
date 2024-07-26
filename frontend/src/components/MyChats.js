import React, { useEffect, useState } from 'react'
import { ChatState, useChatState } from '../Context/ChatProvider';
import { Stack, useToast } from '@chakra-ui/react';
import axios from "axios";
import { Box,Button,Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from './config/ChatLogics';
import GroupChatModel from './miscelleneous/GroupChatModel';
const MyChats = ({fetchAgain}) => {
  const [loggedUser,setLoggedUser]=useState();
  const {user,setSelectedChat,selectedChat ,chats,setChats}=useChatState();
  const toast=useToast();
  const fetchChats=async()=>{
    try{
        // setLoadingChat(true);
        const config={
         headers:{
           
           Authorization:`Bearer ${user.token}`,
         },
        };
        const {data}= await axios.get("/api/chat",config);
        console.log(data);
              
        if (Array.isArray(data)) {
          setChats(data);
        } else {
          throw new Error("Data is not an array");
        }
    }catch(error){
     toast({
       title:"Error occured !",
       description:"Failed to load the chats",
       status:"error",
       duration:5000,
       isClosable:true,
       position:"bottom-left",
      }) ;
    }
 }

useEffect(()=>{
  setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  fetchChats();
},[fetchAgain]);


  return (
   <Box
     display={{base:selectedChat ? "none" : "flex", md:"flex"}}
   flexDir="column"
   alignItems="center"
   p={3}
   bg="white"
   w={{base:"100%" , md:"31%"}}
   borderRadius="lg"
   borderWidth="1px" 

   >
      <Box
        pb={3}
        px={3}
        fontSize={{base:"28px" ,md:"30px"}}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="black"
      >
          MyChats
      <GroupChatModel>
      <Button 
             display="flex"
             fontSize={{base:"17px" , md:"10px", lg:"17px"}}
            rightIcon={<AddIcon/>}
          >
              New Group Chat
          </Button>
      </GroupChatModel>

       

      </Box>
          <Box
           display="flex"
           flexDir="column"
           p={3}
           bg="#F8F87F8"
           w="100%"
           h="100%"
           borderRadius="lg"
           overflowY="hidden"
          >
            {
              chats && Array.isArray(chats) ? (
                    <Stack overflowY="scroll">
                     {chats.map((chat)=>(
                        <Box
                          onClick={()=>setSelectedChat(chat)}
                            cursor="pointer"
                            bg={selectedChat===chat ? "#38B2AC" : "#E8E8E8"}
                            color={selectedChat===chat? "white" : "black"}
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={chat._id}
                        >
                        <Text>
                            {!chat.isGroupChat ? (getSender(loggedUser,chat.users)):(chat.chatName)}
                        </Text>

                        </Box>
                ))}

                    </Stack>
                )  :(<ChatLoading/>)
            }

         </Box>


   </Box>
  );
};

export default MyChats;