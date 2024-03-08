import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react'

const Login = () => {
    const [show,setShow]=useState(false);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const handleClick=()=>{
        setShow(!show);
    }
    const submitHandler=()=>{
          
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