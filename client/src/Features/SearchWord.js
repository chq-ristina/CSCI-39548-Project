import { createSlice } from "@reduxjs/toolkit";

export const searchWordSlice = createSlice({
    name: "searchWord",
    initialState: {value: {searchWord: ""}},
    reducers: {
        setSearchWord: (state, action) => {
            state.value = action.payload
        }
    }
});

export const {setSearchWord} = searchWordSlice.actions;
export default searchWordSlice.reducer;

