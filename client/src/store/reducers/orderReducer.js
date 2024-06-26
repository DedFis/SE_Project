import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async ({
    price,
    products,
    shipping_fee,
    shippingInfo,
    userId,
    navigate,
    items,
  },  { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items,
      });
      navigate("/", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      console.log("ok");
      return fulfillWithValue({
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items,
      });
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_orders = createAsyncThunk(
  'order/get_orders',
  async ({
      customerId,
      status
  }, {
      rejectWithValue,
      fulfillWithValue
  }) => {
      try {
          const {
              data
          } = await api.get(`/home/customer/get-orders/${customerId}/${status}`)
          return fulfillWithValue(data)
      } catch (error) {
          console.log(error.response)
      }
  }
);

export const get_order = createAsyncThunk(
  'order/get_order',
  async (orderId, {
      rejectWithValue,
      fulfillWithValue
  }) => {
      try {
          const {
              data
          } = await api.get(`/home/customer/get-order/${orderId}`)
          return fulfillWithValue(data)
      } catch (error) {
          console.log(error.response)
      }
  }
)

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(place_order.rejected, (state, { payload }) => {
          state.errorMessage = payload.error;
        })
        .addCase(place_order.fulfilled, (state, { payload }) => {
          state.successMessage = payload.message;
        })
        .addCase(get_orders.fulfilled, (state, { payload }) => {
          state.myOrders = payload.orders;
        })
        .addCase(get_order.fulfilled, (state, { payload }) => {
          state.myOrder = payload.order;
        })
    },
});

export const { messageClear, user_reset } = orderReducer.actions;
export default orderReducer.reducer;
