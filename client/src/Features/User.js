import { createSlice } from "@reduxjs/toolkit";

const user_id = localStorage.getItem('user_id') !== null ? JSON.parse(localStorage.getItem('user_id')) : "";
const fname = localStorage.getItem('fname') !== null ? JSON.parse(localStorage.getItem('fname')) : "";
const logged_in = localStorage.getItem('logged_in') !== null ? JSON.parse(localStorage.getItem('logged_in')) : false; 

const setItemFunc = (user_id, fname, logged_in) => {
    localStorage.setItem('user_id', JSON.stringify(user_id));
    localStorage.setItem('fname', JSON.stringify(fname));
    localStorage.setItem('logged_in', JSON.stringify(logged_in));
}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: {user_id: user_id, fname: fname, logged_in: logged_in}},
    reducers:{
        setUser: (state, action) => {
            state.value.user_id = action.payload.user_id;
            state.value.fname = action.payload.fname;
            state.value.logged_in = true;
            
            setItemFunc(state.value.user_id, state.value.fname, state.value.logged_in);
        },
        removeUser: (state, action) =>{
            state.value.user_id = "";
            state.value.fname = "";
            state.value.logged_in = false;

            setItemFunc(state.value.user_id, state.value.fname, state.value.logged_in);
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;