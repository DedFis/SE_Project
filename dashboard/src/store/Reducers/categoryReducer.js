import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async ({ name, image }, {rejectWithValue, fulfillWithValue}) => {
        try{
            const formData = new FormData()
            formData.append('name', name)
            formData.append('image', image)
            const {data} = await api.post('/add-category', formData, {
                withCredentials: true
            })
            return fulfillWithValue(data)
        } catch (error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/get-category?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {
              withCredentials: true
          })
          console.log(data)
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)

export const categoryReducer = createSlice({
  name: 'category',

  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    categorys: []
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ""
      state.successMessage = ""
    }
  },

  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(addCategory.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error
    }); 
    builder.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categorys = [...state.categorys, payload.category]
    });
  }
})

export const {messageClear} = categoryReducer.actions
export default categoryReducer.reducer