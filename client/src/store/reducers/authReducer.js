import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-register", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
      console.log(error);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
      console.log(error);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      });
    builder
      .addCase(customer_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      });
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from '../../api/api';

// // export const customer_register = createAsyncThunk(
// //     'auth/customer_register',
// //     async (info, { rejectWithValue }) => {
// //         try {
// //             const { data } = await api.post('/customer/customer-register', info);
// //             return data;
// //         } catch (error) {
// //             return rejectWithValue(error.response.data);
// //         }
// //     }
// // );

// // export const authReducer = createSlice({
// //     name: 'auth',
// //     initialState: {
// //         loader: false,
// //         userInfo: "",
// //         errorMessage: '',
// //         successMessage: ''
// //     },
// //     reducers: {
// //         messageClear: (state) => {
// //             state.errorMessage = '';
// //             state.successMessage = '';
// //         }
// //     },
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(customer_register.pending, (state) => {
// //                 state.loader = true;
// //                 state.errorMessage = '';
// //                 state.successMessage = '';
// //             })
// //             .addCase(customer_register.fulfilled, (state, action) => {
// //                 state.loader = false;
// //                 state.userInfo = action.payload;
// //                 state.successMessage = 'Registration successful';
// //             })
// //             .addCase(customer_register.rejected, (state, action) => {
// //                 state.loader = false;
// //                 state.errorMessage = action.payload;
// //             });
// //     }
// // });

// // export const { messageClear } = authReducer.actions;
// // export default authReducer.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api/api';
// import jwt from 'jwt-decode';

// export const customer_register = createAsyncThunk(
//     'auth/customer_register',
//     async (info, { rejectWithValue, fulfillWithValue }) => {
//         try {
//             const { data } = await api.post('/customer/customer-register', info);
//             localStorage.setItem('customerToken', data.token);
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const customer_login = createAsyncThunk(
//     'auth/customer_login',
//     async (info, { rejectWithValue, fulfillWithValue }) => {
//         try {
//             const { data } = await api.post('/customer/customer-login', info);
//             localStorage.setItem('customerToken', data.token);
//             return fulfillWithValue(data);
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// const decodeToken = (token) => {
//     if (token) {
//         const userInfo = jwt(token);
//         return userInfo;
//     } else {
//         return '';
//     }
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         loader: false,
//         userInfo: decodeToken(localStorage.getItem('customerToken')),
//         errorMessage: '',
//         successMessage: ''
//     },
//     reducers: {
//         messageClear: (state) => {
//             state.errorMessage = '';
//             state.successMessage = '';
//         },
//         user_reset: (state) => {
//             state.userInfo = "";
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(customer_register.pending, (state) => {
//                 state.loader = true;
//             })
//             .addCase(customer_register.rejected, (state, { payload }) => {
//                 state.errorMessage = payload.error;
//                 state.loader = false;
//             })
//             .addCase(customer_register.fulfilled, (state, { payload }) => {
//                 const userInfo = decodeToken(payload.token);
//                 state.successMessage = payload.message;
//                 state.loader = false;
//                 state.userInfo = userInfo;
//             })

//     }
// });

// export const { messageClear, user_reset } = authSlice.actions;
// export default authSlice.reducer;