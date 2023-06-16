import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {value: {shopping_cart: []}},
    reducers:{
        addToCart: (state, action) => {
            state.value.shopping_cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            //NEEDS FIXING
            console.log(`removing ${action.payload} from cart!!!`);
            console.log("index:",action.payload );
            if(action.payload !== -1){
                state.value.shopping_cart.splice(action.payload, 1);
            }
        },
        emptyCart: (state, action) => {
            state.value.shopping_cart.length = 0;
        }
    }
});

export const {addToCart, removeFromCart, emptyCart} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;