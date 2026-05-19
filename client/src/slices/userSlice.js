import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const newUserThunk = createAsyncThunk(
  "user/newUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://giftmapu-server.onrender.com/register",
        userData
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message
      );
    }
  }
);


export const loginThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {

      const res = await axios.post(
        "https://giftmapu-client-ugdx.onrender.com/login",
        userData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data?.message
      );
    }
  }
);


export const getAllShops = createAsyncThunk(
  "user/getShops",
  async (_, { rejectWithValue }) => {
    try {

      const res = await axios.get(
        "https://giftmapu-client-ugdx.onrender.com/shops"
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(err.message);
    }
  }
);


const initialState = {
  
  user: JSON.parse(localStorage.getItem("user")) || null,
  shops: [],
  msg: null,
  loading: false,
};



const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {

    logout(state) {

      state.user = null;
      state.msg = null;
      state.shops = [];

      //REMOVE USER FROM STORAGE
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {

   //REGISTER 
    builder
      .addCase(newUserThunk.pending, (state) => {

        state.loading = true;
      })

      .addCase(newUserThunk.fulfilled, (state, action) => {

        state.loading = false;
        state.msg = action.payload.message;
      })

      .addCase(newUserThunk.rejected, (state, action) => {

        state.loading = false;
        state.msg = action.payload;
      });

    builder
      .addCase(loginThunk.pending, (state) => {

        state.loading = true;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {

        state.loading = false;

        state.user = action.payload.user;

        state.msg = action.payload.message;
      })

      .addCase(loginThunk.rejected, (state, action) => {

        state.loading = false;
        state.msg = action.payload;
      });

    builder
      .addCase(getAllShops.pending, (state) => {

        state.loading = true;
      })

      .addCase(getAllShops.fulfilled, (state, action) => {

        state.loading = false;
        state.shops = action.payload;
      })

      .addCase(getAllShops.rejected, (state, action) => {

        state.loading = false;
        state.msg = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
