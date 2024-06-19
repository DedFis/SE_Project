import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Thunks
export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categorys');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_product = createAsyncThunk(
    'product/get_product',
    async (slug, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/get-product/${slug}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-product');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_banners = createAsyncThunk(
    'product/get_banners',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/banners');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/home/customer/submit-review', info);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({ productId, pageNumber }, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const homeSlice = createSlice({
    name: 'home',
    initialState: {
        categorys: [],
        products: [],
        totalProduct: 0,
        parPage: 4,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRange: {
            low: 0,
            high: 100
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        successMessage: '',
        errorMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews: [],
        banners: []
    },
    reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.categorys = payload.categorys;
            })
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.latest_product = payload.latest_product;
                state.topRated_product = payload.topRated_product;
                state.discount_product = payload.discount_product;
            })
            .addCase(get_product.fulfilled, (state, { payload }) => {
                state.product = payload.product;
                state.relatedProducts = payload.relatedProducts;
                state.moreProducts = payload.moreProducts;
            })
            .addCase(price_range_product.fulfilled, (state, { payload }) => {
                state.latest_product = payload.latest_product;
                state.priceRange = payload.priceRange;
            })
            .addCase(query_products.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.totalProduct = payload.totalProduct;
                state.parPage = payload.parPage;
            })
            .addCase(customer_review.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(get_reviews.fulfilled, (state, { payload }) => {
                state.reviews = payload.reviews;
                state.totalReview = payload.totalReview;
                state.rating_review = payload.rating_review;
            })
            .addCase(get_banners.fulfilled, (state, { payload }) => {
                state.banners = payload.banners;
            });
    }
});

export const { messageClear } = homeSlice.actions;
export default homeSlice.reducer;
