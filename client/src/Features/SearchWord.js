import { createSlice } from "@reduxjs/toolkit";

const searchWord = localStorage.getItem('searchWord') != null ? JSON.parse(localStorage.getItem('searchWord')) : "";

export const searchWordSlice = createSlice({
    name: "searchWord",
    initialState: {value: {searchWord: searchWord}},
    reducers: {
        setSearchWord: (state, action) => {
            state.value = action.payload;

            localStorage.setItem('searchWord', JSON.stringify(state.value.searchWord));
        }
    }
});

export const {setSearchWord} = searchWordSlice.actions;
export default searchWordSlice.reducer;

