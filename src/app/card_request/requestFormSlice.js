import { createSlice } from "@reduxjs/toolkit"


const initState ={
    nin:"",
    date_of_birth:`${new Date().toISOString().substring(0, 10)}`,
    first_name:"",
    last_name: "",
    middle_name:""
}

const cardRequestFormSlice = createSlice({
    name: 'requestForm',
    initialState: initState,
    reducers:{
        updateForm:(state,action)=>{
            state[`${action.payload.target}`] = action.payload.value
        },
    }
})

export const {updateForm} = cardRequestFormSlice.actions

export default cardRequestFormSlice.reducer