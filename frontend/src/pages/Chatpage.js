import React, { useEffect} from 'react';

import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscelleneous/SideDrawer';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';

const Chatpage = () => {

  const {user}=ChatState();

 
 

return (
  <div style={{width:"100%"}}>
  {user&&<SideDrawer/>}

  <Box display="flex"
       justifyContent="space-between"
       w="100%"
       h="91.5vh"
       p="10px"
       color="white"
   >
          {user&&<MyChats/>}
          {user&&<ChatBox/>}
  </Box>
     

  </div>
);
};
export default Chatpage;
