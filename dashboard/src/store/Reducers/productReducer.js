import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (product, {rejectWithValue, fulfillWithValue}) => {
        try{
            const {data} = await api.post('/add-product', product, {
                withCredentials: true
            })
            return fulfillWithValue(data)
        } catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/get-product?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {
              withCredentials: true
          })
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const productReducer = createSlice({
  name: 'product',

  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    totalProducts: 0
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ""
      state.successMessage = ""
    }
  },

  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(addProduct.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error
    }); 
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.products = [...state.products, payload.products]
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.totalProducts = payload.totalProducts;
      state.products = payload.products
    });
  }
})

export const {messageClear} = productReducer.actions
export default productReducer.reducer