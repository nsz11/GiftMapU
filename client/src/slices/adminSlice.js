import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://giftmapu-client.onrender.com";

   //GET ALL SHOPS (ADMIN)
export const getAdminShops = createAsyncThunk(
  "admin/getShops",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/shops`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

   //ADD SHOP
export const addShop = createAsyncThunk(
  "admin/addShop",
  async (shopData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/admin/shop/add`, shopData);
      return res.data.shop;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

   //UPDATE SHOP
export const updateShop = createAsyncThunk(
  "admin/updateShop",
  async (shopData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/admin/shop/update`, shopData);
      return res.data.shop;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

   //DELETE SHOP
export const deleteShop = createAsyncThunk(
  "admin/deleteShop",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/admin/shop/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


  
const initialState = {
  shops: [],
  products: [],
  loading: false,
  msg: null
};


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    /* ===== SHOPS ===== */
    builder
      .addCase(getAdminShops.fulfilled, (state, action) => {
        state.shops = action.payload;
      })

      .addCase(addShop.fulfilled, (state, action) => {
        state.shops.push(action.payload);
      })

      .addCase(updateShop.fulfilled, (state, action) => {
        const index = state.shops.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.shops[index] = action.payload;
        }
      })

      .addCase(deleteShop.fulfilled, (state, action) => {
        state.shops = state.shops.filter(s => s._id !== action.payload);
      });

  }
});

export default adminSlice.reducer;
