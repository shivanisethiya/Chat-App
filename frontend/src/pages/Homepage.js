import React, { useEffect } from 'react';
import {Box, Container,Text,Tab,TabPanel,TabPanels,TabList,Tabs} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp  from '../components/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
 const navigate=useNavigate();
 useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("userInfo"));
  
   if(user)
   {
        navigate("/chats");
   } 
},[navigate]);
 

  


  return (
    <Container maxW='xl' centerContent style={{ backdropFilter: 'blur(10px)' }}>
         <Box
           d="flex"
           justifyContent="center"
           p={3}
          
           w="100%"
           m="40px 0 15px 0"
           borderRadius="lg"
           borderWidth="1px"
         >
            <Text  fontSize='4xl' fontFamily="work sans" color="white" textAlign="center">
                Let's Talk
            </Text> 
         </Box>

      <Box
       bg="transparent"
       w="100%"
       p={4}
       borderRadius="lg"
       borderWidth="1px"
      color="white"
       
      >

<Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab color="white" width="50%">Login</Tab>
    <Tab color="white" width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login/>
    </TabPanel>
    <TabPanel>
     <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>

      </Box>

    </Container>
  )
};
export default Homepage