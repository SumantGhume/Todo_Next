import mongoose from "mongoose";

const connectDB =async()=>{
        try {
             await mongoose.connect(process.env.MONGODB_URI);
            console.log("We have successfully Connected to MongoDB Database...😁✅")
        } catch (error) {
            console.log("Error at connecting Database...😒",error)
        }
}

export default connectDB;