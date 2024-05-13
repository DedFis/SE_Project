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

export const sellerReducer = createSlice({
  name: 'category',

  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    sellers: [],
    totalSeller: 0
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
  }
})

export const {messageClear} = sellerReducer.actions
export default sellerReducer.reducer