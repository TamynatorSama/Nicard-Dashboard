import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isModalOpen: false,
    isLoadingBankBranches:false,
    requestForm:{
        first_name:"",
        last_name: "",
        phone_number:"",
        password: "",
        branch:"",
        role:{}
    }
}



const createNewUserSlice = createSlice({
    name: "accessControl/createUser",
    initialState,
    reducers:{
        updateState:(state,action)=>{
            state[action.payload.key] = action.payload.value
        }
    }

})

export const {updateState} = createNewUserSlice.actions
export const createUserModalState = state=>state.createNewUser.isModalOpen
export default createNewUserSlice.reducer