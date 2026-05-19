import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
});

const AdminModel = mongoose.model("admins", AdminSchema);
export default AdminModel;


