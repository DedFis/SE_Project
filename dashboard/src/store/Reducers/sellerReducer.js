import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getSellerRequest = createAsyncThunk(
  'seller/getSellerRequest',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/get-seller-request?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {
              withCredentials: true
          })
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const getSeller = createAsyncThunk(
  'seller/getSeller',
  async (sellerId, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/get-seller/${sellerId}`, {
              withCredentials: true
          })
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const sellerStatusUpdate = createAsyncThunk(
  'seller/sellerStatusUpdate',
  async (info, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.post(`/seller-status-update`, info, {
              withCredentials: true
          })
          console.log(data)
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const getActiveSeller = createAsyncThunk(
  'seller/getActiveSeller',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
        const {data} = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {
          withCredentials: true
      })
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const sellerReducer = createSlice({
  name: 'seller',

  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: ''
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ""
      state.successMessage = ""
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getSellerRequest.fulfilled, (state, {payload}) => {
      state.sellers = payload.sellers
      state.totalSeller = payload.totalSeller
    });
    builder.addCase(getSeller.fulfilled, (state, {payload}) => {
      state.seller = payload.seller
    });
    builder.addCase(sellerStatusUpdate.fulfilled, (state, {payload}) => {
      state.seller = payload.seller
      state.successMessage = payload.message
    });
    builder.addCase(getActiveSeller.fulfilled, (state, {payload}) => {
      state.sellers = payload.sellers
      state.totalSeller = payload.totalSeller
    });
  }
})

export const {messageClear} = sellerReducer.actions
export default sellerReducer.reducer