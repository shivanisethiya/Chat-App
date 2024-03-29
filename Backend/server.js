const express=require("express");
const dotenv=require("dotenv");
const {chats}=require("./Data/data");
const connectDB = require("./config/database");
const colors=require("colors");
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");
const app=express();
dotenv.config();
connectDB();
const PORT=process.env.PORT||5000;
app.get('/',(req,res)=>{
         res.send("api is running");
});
app.use(express.json());
// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
//     console.log(chats);
// });
// app.get("/api/chat/:id",(req,res)=>{
//        console.log("hello");
//     console.log(req.params.id);
// const singleChat=chats.find((c)=>c._id===req.params.id);
// res.send(singleChat);

// });

app.use('/api/user',userRoutes);
app.use("/api/chat",chatRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT,console.log(`Server started on port 5000`.yellow));