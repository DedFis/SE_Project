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
  }) => {
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
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      console.log("ok");
      return true;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOders: [],
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
  //   extraReducers: (builder) => {
  //     builder;
  //     //   .addCase(add_to_card.rejected, (state, { payload }) => {
  //     //     state.errorMessage = payload.error;
  //     //   })
  //   },
});

export const { messageClear, user_reset } = orderReducer.actions;
export default orderReducer.reducer;
