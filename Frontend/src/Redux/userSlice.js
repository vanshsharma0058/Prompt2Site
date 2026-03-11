import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        }
    }
})

//in actions we have the function that we want to use in our components
export const {setUserData}=userSlice.actions
export default userSlice.reducer 