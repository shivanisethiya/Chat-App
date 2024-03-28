import { Box,
   Tooltip,
   Button,
   Text,
    Menu,MenuButton,
    MenuItem,MenuList,
     Avatar, MenuDivider,
      Drawer, DrawerOverlay,
       DrawerContent, DrawerHeader,
        DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import React, { useState} from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import axios from 'axios';
import { set } from 'mongoose';
const SideDrawer = () => {
      const [search,setSearch]=useState("");
      const [searchResult,setSearchResult]=useState([]);
      const [loading,setLoading]=useState(false);
      const [loadingChat,setLoadingChat]=useState();
      const {user,setSelectedChat,chats,setChats}=ChatState();
      const navigate=useNavigate();
     const {isOpen,onOpen,onClose}=useDisclosure();
     const btnRef = React.useRef();
     const toast=useToast();
      const logoutHandler=()=>{
        localStorage.removeItem("userInfo");
        navigate("/");
      }
    const handleSearch=async()=>{
           if(!search){
            toast({
              title:"Please Enter name or email",
              status:"warning",
              duration:5000,
              isClosable:true,
              position:"top-left",

            });
            return;
           }
        try{
          setLoading(true);
          const config={
            headers:{
              Authorization:`Bearer ${user.token}`
            },
          };
          const {data}=await axios.get(`/api/user?search=${search}`,config);
         setLoading(false);
         setSearchResult(data);

        }
        catch(error){
           toast({
            title:"Error Occured !",
            description:"Failed to Load the search Results",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom-left",
           })
        }
      
    };

    const accessChat=async(userId)=>{
       try{
           setLoadingChat(true);
           const config={
            headers:{
              "Content-type":"application/json",
              Authorization:`Bearer ${user.token}`,
            },
           };
           const {data}= await axios.post('/api/chat',{userId},config);
          
             if(!chats.find((c)=>c._id===data._id))
              setChats([data, ...chats]);
          
           setSelectedChat(data);
           setLoading(false);
           onClose();
       }catch(error){
        toast({
          title:"Error fetching the chat",
          description:error.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left",
         }) ;
       }
    }

  return (
    <>
         <Box
           display="flex"
           justifyContent="space-between"
           alignItems="center"
           bg="white"
           w="100%"
           p="5px 10px 5px 10px"
           borderWidth="5px"
          
         >
            <Tooltip
             label="Search Users to Chat"
             hasArrow
             placement="bottom-end"
            >
               <Button
               ref={btnRef}
                variant="ghost" 
                onClick={onOpen}
               >

                <i class="fas fa-search"></i>
                <Text
                   display={{base:"none",md:"flex"}}
                   px="4"
                  
                >
                  Search User
                </Text>
               </Button>   

            </Tooltip>
           
           <Text fontSize="2xl" fontFamily="work-sans">
               Let's Talk
           </Text>

           <div>
           <Menu>
             <MenuButton p={1}>
               <BellIcon fontSize="2xl" m={1}  />
             </MenuButton>

          </Menu>
          <Menu>
             <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size='sm' cursor="pointer" name={user.name} src={user.pic} />
             </MenuButton>
             
              <MenuList>
              <ProfileModel user={user}>
              <MenuItem> My Profile</MenuItem>
              </ProfileModel>
               
                 <MenuDivider/>
                 <MenuItem onClick={logoutHandler}> Logout</MenuItem>

              </MenuList>
          </Menu>
          
       


           </div>

         </Box>

<Drawer placement='left' finalFocusRef={btnRef} onClose={onClose} isOpen={isOpen}>
  <DrawerOverlay/>
  <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">
          Search Users
      </DrawerHeader>
  
  <DrawerBody>
     <Box display="flex" pb={2}>

       <Input
       placeholder="Search by name or email"
       mr={2}
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
       
       
       />
       <Button onClick={handleSearch}>Go</Button>
       </Box>
       
          {
            loading ?
          (
            <ChatLoading/>
          )
          :
           (
            searchResult?.map(user =>(
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
              />
            ))
           )
          }
     
   {
    loading && <Spinner ml="auto" display="flex"/>
   }
    
  </DrawerBody>
</DrawerContent>
</Drawer>


    </>
  )
}

export default SideDrawer