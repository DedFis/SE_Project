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

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (product, {rejectWithValue, fulfillWithValue}) => {
        try{
            const {data} = await api.post('/update-product', product, {
                withCredentials: true
            })
            return fulfillWithValue(data)
        } catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const product_image_update = createAsyncThunk(
    'product/product_image_update',
    async ({oldImage, newImage, productId}, {rejectWithValue, fulfillWithValue}) => {
        try{
            const formData = new FormData()
            formData.append('oldImage', oldImage)
            formData.append('newImage', newImage)
            formData.append('productId', productId)
            const {data} = await api.post('/product-image-update', formData, {
                withCredentials: true
            })
            return fulfillWithValue(data)
        } catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/get-products?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {
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
    async (productId, {rejectWithValue, fulfillWithValue}) => {
        try{
            const {data} = await api.get(`/get-product/${productId}`, {
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
    product: '',
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
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.totalProducts = payload.totalProducts;
      state.products = payload.products
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
        state.product = payload.product
    });
    builder.addCase(updateProduct.pending, (state, _) => {
        state.loader = true;
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error
    }); 
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loader = false
        state.product = payload.product
        state.successMessage = payload.message;
    });
    builder.addCase(product_image_update.fulfilled, (state, { payload }) => {
        state.product = payload.product
        state.successMessage = payload.message;
    });
  }
})

export const {messageClear} = productReducer.actions
export default productReducer.reducer