import mongoose from "mongoose";
const adminSchema = new mongoose.Schema ({

    email :{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    }
})

const adminmodel = mongoose.model("admindetails",adminSchema)

export{adminmodel}