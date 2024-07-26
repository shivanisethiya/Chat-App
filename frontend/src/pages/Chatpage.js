import React, { useEffect} from 'react';

import { ChatState, useChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscelleneous/SideDrawer';
import ChatBox from '../components/ChatBox';
import MyChats from '../components/MyChats';
import { useState } from 'react';
const Chatpage = () => {

  const {user}=useChatState();

 const [fetchAgain,setFetchAgain]=useState(false);
 

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
          {user&&<MyChats fetchAgain={fetchAgain}/>}
          {user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
  </Box>
     

  </div>
);
};
export default Chatpage;
