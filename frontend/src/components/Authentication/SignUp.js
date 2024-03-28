import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const SignUp = () => {
    const [show,setShow]=useState(false);
    const [show2,setShow2]=useState(false);
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmpassword,setConfirmpassword]=useState();
    const [pic,setPic]=useState();
    const [loading,setLoading]=useState(false);
    const toast = useToast();
    const navigate=useNavigate();
const handleClick=()=>{
    setShow(!show);
}
const handleClick2=()=>{
  setShow2(!show2);
}
const postDetails=(pic)=>{
   setLoading(true);
   if(pic===undefined){
    toast({
      title: 'please select image.',
      description: "We've created your account for you.",
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position:"bottom",
    });
    setLoading(false);
    return;
   }
   if(pic.type==="iage/jpeg"||pic.type==="image/png")
       {
           const data=new FormData();
           data.append("file",pic);
           data.append("upload_preset","Chat-app");
           data.append("cloud_name",process.env.CLOUD_NAME);
           fetch(process.env.APP_BASE_URL,{
             method:'post',
             body:data,
           }).then((res)=>res.json())
           .then(data=>{
            setPic(data.url.toString());
            setLoading(false);
           })
           .catch((err)=>{
            console.log(err);
            setLoading(false);
           });
          
       }
      else{
        toast({
          title: 'please select image in jpeg and png.',
          description: "We've created your account for you.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        setLoading(false);
        return;
      }
        


};
const submitHandler=async()=>{
          setLoading(true);
         
          if(!name||!email||!password||!confirmpassword){
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
          if(password!==confirmpassword){
            toast({
              title:"Password doesn't match",
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
    
        const {data}=await axios.post("/api/user",{name,email,password,pic},config);
console.log(data);





         toast({
          title:"Registration Successfull",
          status:"success",
          duration:5000,
          isClosable:true,
          position:"bottom",
          
         });

 localStorage.setItem('userInfo',JSON.stringify(data));
 setLoading(false);
navigate('/chats');




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
        }


};


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

         
         <FormControl id="confirmpassword" isRequired>
                   <FormLabel>Confirm Password</FormLabel>
                      <InputGroup size="md">
                      <Input
                       type={show2 ? "text" : "password"}
                        placeholder='Re-Enter password '
                        onChange={(e)=>setConfirmpassword(e.target.value)} />
                       <InputRightElement width="4.5rem">

                              <Button h="1.75rem" size="sm" onClick={handleClick2}>
                                {
                                    show2 ? "Hide":"Show"
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
           isLoading={loading}
         >
            Sign Up
         </Button>

     </VStack>
  )
}
export default SignUp;