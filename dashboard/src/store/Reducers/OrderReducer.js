import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getAdminOrders = createAsyncThunk(
  'order/getAdminOrders',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, {
              withCredentials: true
          })
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const getSellerOrders = createAsyncThunk(
    'order/getSellerOrders',
    async ({ parPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_admin_order = createAsyncThunk(
    'order/get_admin_order',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/admin/order/${orderId}`, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const admin_order_status_update = createAsyncThunk(
    'order/admin_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/admin/order-status/update/${orderId}`, info, { withCredentials: true })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const OrderReducer = createSlice({
  name: 'order',

  initialState: {
    successMessage: '',
    errorMessage: '',
    totalOrder : 0,
    order : {},
    myOrders : []
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ""
      state.successMessage = ""
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getAdminOrders.fulfilled, (state, {payload})=>{
        state.myOrders = payload.orders
        state.totalOrder = payload.totalOrder
    });
    builder.addCase(get_admin_order.fulfilled, (state, {payload})=>{
        state.order = payload.order
    });
    builder.addCase(admin_order_status_update.rejected, (state, {payload})=>{
        state.errorMessage = payload.message
    });
    builder.addCase(admin_order_status_update.fulfilled, (state, {payload})=>{
        state.successMessage = payload.message
    });
    builder.addCase(getSellerOrders.fulfilled, (state, {payload})=>{
        state.myOrders = payload.orders
        state.totalOrder = payload.totalOrder
    });
  }
})

export const {messageClear} = OrderReducer.actions
export default OrderReducer.reducer