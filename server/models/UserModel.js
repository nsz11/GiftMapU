import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    firstName : {type:String, required: true},
    lastName : {type:String, required: true},
    email : {type:String, required: true, unique: true},
    phone : {type:String, required: true},
    address : {type:String, required: true},
    password : {type:String, required: true},
    profilePic: { type: String, default: null },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

});

const UserModel=mongoose.model("users",UserSchema);
export default UserModel;
