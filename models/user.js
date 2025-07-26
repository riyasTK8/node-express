import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    place: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required:true
    }
    

    
});



const usermodel = mongoose.model('users', userSchema, 'userdetails');


export { usermodel };
