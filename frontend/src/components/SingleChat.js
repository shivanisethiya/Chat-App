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


import React from 'react';
import { useChatState } from '../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from "../components/config/ChatLogics";
import ProfileModel from './miscelleneous/ProfileModel';
import UpdateGroupChatModal from './miscelleneous/UpdateGroupChatModal';
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChatState(); // Corrected hook usage

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
                
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
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
