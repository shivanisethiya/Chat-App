const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URL,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            
        });
        
        console.log("MongoDB Connected:".yellow, conn.connection.host.cyan);

    }
    catch(error){
            console.log(`Error: ${error.message}`.red );
            process.exit(1);
    }
};
module.exports=connectDB;


