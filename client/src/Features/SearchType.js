import { createSlice } from "@reduxjs/toolkit";

export const searchTypeSlice = createSlice({
    name: "searchType",
    initialState: {value: {searchType: "Title"}},
    reducers: {
        setSearchType: (state, action) =>{
            state.value = action.payload;
        }
    }
});

export const {setSearchType} = searchTypeSlice.actions;
export default searchTypeSlice.reducer;