import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice.js"
import adminReducer from "../slices/adminSlice.js"

const store = configureStore(
    {
        reducer : {
            user : userReducer,
            admin : adminReducer
        }

    }
)

export default store