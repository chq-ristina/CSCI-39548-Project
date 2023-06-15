import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./User";

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {value: {shopping_cart: []}},
    reducers:{
        addToCart: (state, action) => {
            state.value.shopping_cart.push(action.payload);
        },
        emptyCart: (state, action) => {
            state.value.shopping_cart.length = 0;
        }
    }
});

export const {addToCart, emptyCart} = userSlice.actions;
export default shoppingCartSlice.reducer;