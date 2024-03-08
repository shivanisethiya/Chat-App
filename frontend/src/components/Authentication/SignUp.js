import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
const SignUp = () => {
    const [show,setShow]=useState(false);
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmpassword,setConfirmpassword]=useState();
    const [pic,setPic]=useState();
const handleClick=()=>{
    setShow(!show);
}
const postDetails=(pic)=>{
 
}
const submitHandler=()=>{
          
}


  return (
     <VStack>
        <FormControl id="first-name" isRequired>
                   <FormLabel>Name</FormLabel>
                     <Input
                        placeholder='Enter Your Name'
                        onChange={(e)=>setName(e.target.value)} />
         </FormControl>

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

         
         <FormControl id="password" isRequired>
                   <FormLabel>Confirm Password</FormLabel>
                      <InputGroup size="md">
                      <Input
                       type={show ? "text" : "password"}
                        placeholder='Re-Enter password '
                        onChange={(e)=>setConfirmpassword(e.target.value)} />
                       <InputRightElement width="4.5rem">

                              <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {
                                    show ? "Hide":"Show"
                                }
                              </Button>

                       </InputRightElement>
                      </InputGroup>                
         </FormControl>
           
         <FormControl id="pic" isRequired>
                   <FormLabel>Upload your picture</FormLabel>
                     <Input
                     type="file"
                      p={1.5}
                      accept="images/*"
                        placeholder='Enter Your Name'
                        onChange={(e)=>postDetails(e.target.files[0])} />
         </FormControl>

         <Button
           colorScheme='blue'
           width="100%"
           style={{marginTop:15}}
           onClick={submitHandler}
         >
            Sign Up
         </Button>

     </VStack>
  )
}
export default SignUp;