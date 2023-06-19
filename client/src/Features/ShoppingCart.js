import { createSlice } from "@reduxjs/toolkit";

const shopping_cart = localStorage.getItem('shopping_cart') !== null ? JSON.parse(localStorage.getItem('shopping_cart')) : [];

const setItemFunc = (item) => {
    localStorage.setItem('shopping_cart', JSON.stringify(item));
} 

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {value: {shopping_cart: shopping_cart}},
    reducers:{
        addToCart: (state, action) => {
            state.value.shopping_cart.push(action.payload);

            localStorage.setItem('shopping_cart', JSON.stringify(state.value.shopping_cart.map(item => item)) );
            //setItemFunc(state.value.shopping_cart.map(item => item));
        },
        removeFromCart: (state, action) => {
            //NEEDS FIXING
            //console.log(`removing ${action.payload} from cart!!!`);
            //console.log("index:",action.payload );
            if(action.payload !== -1){
                state.value.shopping_cart.splice(action.payload, 1);
            }

            setItemFunc(state.value.shopping_cart.map(item => item));
        },
        emptyCart: (state, action) => {
            state.value.shopping_cart.length = 0;

            setItemFunc(state.value.shopping_cart.map(item => item));
        }
    }
});

export const {addToCart, removeFromCart, emptyCart} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;