import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react'
import {useToast} from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [show,setShow]=useState(false);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const[loading,setLoading]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();
    const handleClick=()=>{
        setShow(!show);

    }
    const submitHandler=async()=>{
          setLoading(true);
          if(!email||!password)
          {
            toast({
              title:"Please fill all the fields",
              status:"warning",
              duration:5000,
              isClosable:true,
              position:"bottom",

            });
            setLoading(false);
            return;
          }
           try{
            const config={
              headers:{
                "Content-type":"application/json",
              },
            };
            console.log("Sending request with data:", { email, password }); 
           const {data}=await axios.post("api/user/login",
               {email,password},
               config
              
           
           );
           toast({
            title:"Login Successfull",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"bottom",   
           });
           localStorage.setItem("userInfo",JSON.stringify(data));
           setLoading(false);
            navigate("/chats");             

           }
           catch(error){
            toast({
              title:"Error Occured",
              description:error.response.data.message,
              status:"error",
              duration:5000,
              isClosable:true,
              position:"bottom",   
             });
             setLoading(false);
             return;
           }


    }
  return (
    <VStack>
           <FormControl id="email" isRequired>
                   <FormLabel>Email</FormLabel>
                     <Input
                        placeholder='Enter Your Email-Address'
                        onChange={(e)=>setEmail(e.target.value)} />
         </FormControl>

         <FormControl id="password" isRequired>
                   <FormLabel>Password</FormLabel>
                   <InputGroup size="md">
                   <Input
                   type={show ? "text" : "password"}
                        placeholder='Enter Password'
                        onChange={(e)=>setPassword(e.target.value)} />
                       <InputRightElement width="4.5rem">

                   <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {
                       show ? "Hide":"Show"
                      }
                  </Button>
                  </InputRightElement>
                   </InputGroup>
                    
         </FormControl>

         <Button
           colorScheme='blue'
           width="100%"
           style={{marginTop:15}}
           onClick={submitHandler}
           isLoading={loading}
         >
            Login
         </Button>


         <Button
         varient="solid"
           colorScheme='red'
           width="100%"
           style={{marginTop:15}}
           onClick={()=>{
            setEmail("sethiyashivani512@gmail.com");
            setPassword("123456");
           }}
         >
            Get Guest User crendential
         </Button>

    </VStack>
  )
}
export default Login;