import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {value: {user_id: "", fname: "", logged_in: false}},
    reducers:{
        setUser: (state, action) => {
            state.value.user_id = action.payload.user_id;
            state.value.fname = action.payload.fname;
            state.value.logged_in = true;
        },
        removeUser: (state, action) =>{
            state.value.user_id = "";
            state.value.fname = "";
            state.value.logged_in = false;
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;