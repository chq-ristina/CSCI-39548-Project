import { createSlice } from "@reduxjs/toolkit";

export const favoritingSlice = createSlice({
    name: "favoriting",
    initialState: {value: {toInsert: [], toRemove: []}},
    reducers: {
        addFavoriteInsert: (state, action) => {
            state.value.toInsert.push(action.payload);
        },
        removeFavoriteInsert: (state, action) => {
            const index = state.value.toInsert.indexOf(action.payload);
            if(index > -1){
                state.value.splice(index, 1);
            }
        }, 

        addFavoriteRemove: (state, action) => {
            state.value.toRemove.push(action.payload);
        },
        removeFavoriteRemove: (state, action) => {
            const index = state.value.toRemove.indexOf(action.payload);
            if(index > -1){
                state.value.splice(index, 1);
            }
        } 
    }
});

export const {addFavoriteInsert, addFavoriteRemove, removeFavoriteInsert, removeFavoriteRemove} = favoritingSlice.actions;
export default favoritingSlice.reducer;