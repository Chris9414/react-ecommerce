import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { getCartThunk, setCart } from './cart.slice';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state,action) => {
            const purchases = action.payload
            return purchases
        }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
        .then(res => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', cart , getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(res => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const updateQuantityThunk = (id, quantity) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, {quantity: quantity}, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}



export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
