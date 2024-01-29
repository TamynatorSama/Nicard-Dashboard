import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import { appAxios } from "../../utils/axiosConfig"
import { Bounce, toast } from "react-toastify";

const initState={
    isLoading: false,
    token:"",
    loginData:{}
}

const notify = (message) => toast.success(`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
const notifyError = (message) => toast.error(`${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });


export const loginThunk = createAsyncThunk('/auth/login',async(value)=>{
    try{
        const response = await appAxios.post('/auth',value.data)
        
        return {
            data:response.data}
    }catch(e){
        if(e.response?.data?.error){
            return Object.values(e.response.data.error).flat()[0]
        }else if(e.response?.data?.message){
            return e.response?.data?.message
        }
        else {
            return e.message
        }
    }
    
})

const loginSlice = createSlice({
    name:"loginSlice",
    initialState:initState,
    reducers:{
        updateTokenFromStorage: (state,action)=>{
            
            state.token = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(loginThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(loginThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            if(action.payload?.data?.result.token){
                state.token = action.payload?.data.result.token
                localStorage.setItem('token',state.token)
                state.loginData = action.payload?.data.result.user_payload
                notify(action.payload.message)
                return;
            }
            
            notifyError(action.payload)
            
        })
        builder.addCase(loginThunk.rejected,(state,action)=>{
            state.isLoading = false
            notifyError(action.error)
        })
    }
})

export const {updateTokenFromStorage} = loginSlice.actions
export default loginSlice.reducer