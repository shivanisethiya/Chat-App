import React, { useEffect, useState } from 'react';
import { useChatState } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from "../components/config/ChatLogics";
import ProfileModel from './miscelleneous/ProfileModel';
import UpdateGroupChatModal from './miscelleneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import './styles.css';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../animations/typing.json'
const ENDPOINT = "http://localhost:5000";

let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  const { user, selectedChat, setSelectedChat ,notification,setNotification} = useChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing,setTyping]=useState(false);
  const [istyping,setIsTyping]=useState(false);

  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData:animationData,
    renderSettings:{
      preserveAspectRatio:"xMidYMid slice",
    },
  }


  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on('connected', () => setSocketConnected(true));
      socket.on('typing', () => setIsTyping(true));
      socket.on('stop typing', () => setIsTyping(false));
    }
    
    // Clean up event listeners before setting new ones
    return () => {
      if (socket) {
        socket.off("message recieved");
      }
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      selectedChatCompare = selectedChat;
      

      socket.emit('join chat', selectedChat._id);
        
      socket.off("message recieved");
      socket.on("message recieved", (newMessageRecieved) => {
       
        if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
          // give notification
               if(!notification.includes(newMessageRecieved)){
                setNotification([newMessageRecieved, ...notification]);
                setFetchAgain(!fetchAgain);

               } 
          // console.log('New message for a different chat:', newMessageRecieved);
        } else {
          setMessages(prevMessages => [...prevMessages, newMessageRecieved]);
        }
      });

  

    }
    else{
      socket.on("message recieved", (newMessageRecieved) => {
       
        
          // give notification
               if(!notification.includes(newMessageRecieved)){
                setNotification([newMessageRecieved, ...notification]);
                setFetchAgain(!fetchAgain);

              
          // console.log('New message for a different chat:', newMessageRecieved);
        } 
      });
    }

  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    setNotification([]);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occured!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {

    if (event.key === "Enter" && newMessage) {
      socket.emit('stop typing',selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post("/api/message", {
          content: newMessage,
          chatId: selectedChat._id,
        }, config);

        socket.emit("new message", data);
        setMessages(prevMessages => [...prevMessages, data]);
      } catch (error) {
        toast({
          title: "Error occured!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit("typing",selectedChat._id);
    }
    let lastTypingtime=new Date().getTime();
    var timerLength=3000;
    setTimeout(()=>{
           var timeNow=new Date().getTime();
           var timeDiff=timeNow-lastTypingtime;
           if(timeDiff>=timerLength&&typing){
            socket.emit('stop typing',selectedChat._id);
            setTyping(false);
           }
    },timerLength);
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
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
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
              <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {istyping?<div><Lottie
              options={defaultOptions}
                width={70}
                style={{marginBottom:15,marginLeft:0}}

              /></div>:<></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message..."
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

