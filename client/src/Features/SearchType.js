import { createSlice } from "@reduxjs/toolkit";

const searchType = localStorage.getItem('searchType') != null ? JSON.parse(localStorage.getItem('searchType')) : "Title";

export const searchTypeSlice = createSlice({
    name: "searchType",
    initialState: {value: {searchType: searchType}},
    reducers: {
        setSearchType: (state, action) =>{
            state.value = action.payload;

            localStorage.setItem('searchType', JSON.stringify(state.value.searchType));
        }
    }
});

export const {setSearchType} = searchTypeSlice.actions;
export default searchTypeSlice.reducer;