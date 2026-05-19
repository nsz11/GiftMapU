import mongoose from "mongoose";

const ShopSchema = mongoose.Schema({
    shopName: { type: String, required: true },
    contact: { type: String, required: true },
    address : {type : String , required:true},
    location : {lat : Number , lng :Number},
    shopImage: { type: String , required:true},
});

const ShopModel = mongoose.model("shops", ShopSchema);
export default ShopModel;


