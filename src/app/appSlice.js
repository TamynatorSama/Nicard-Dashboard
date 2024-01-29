import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { appAxios } from "../utils/axiosConfig"

const initState = {
    institutionCardList:[],
    profileData:{},
    loading: "idle", //idle,loading,success,error
    error:null
}


export const appDataThunk = createAsyncThunk('user/profile',async(token)=>{
    try{
        
        const response = await appAxios.get('/user',{headers: {
            "Authorization": `Bearer ${token}`
        }})
        
        // const response = await appAxios.get('cards/getBankCardRequests/:bankId')
        
        return {
            data:response.data,}
    }catch(e){
        console.log(e)
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
export const cardListThunk = createAsyncThunk('card/list',async(access)=>{
    try{
        
        const response = await appAxios.get(`/cards/getBankCardRequests/${access.bank_id}`,{headers: {
            "Authorization": `Bearer ${access.token}`
        }})
        
        return {
            data:response.data,}
    }catch(e){
        console.log(e)
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

const appSlice = createSlice({
    name: "appSlice",
    initialState: initState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(appDataThunk.pending,(state,action)=>{
            state.loading = "loading"
        })
        builder.addCase(appDataThunk.fulfilled,(state,action)=>{
            if(action.payload?.data?.result){
                let result = action.payload?.data?.result
                state.profileData= {...result}
                return;
            }
            state.loading = "error"
            state.error=action.payload
            
        })
        builder.addCase(appDataThunk.rejected,(state,action)=>{
            state.loading = "error"
            state.error=action.error
            // notifyError(action.error)

        })
        builder.addCase(cardListThunk.fulfilled,(state,action)=>{
            
            if(action.payload?.data?.result){
               
                state.loading = "success"
                let result = action.payload?.data?.result
                state.institutionCardList= [...result]
                console.log(state.institutionCardList)
                return;
            }
            state.loading = "error"

            state.error=action.payload
            
        })
        builder.addCase(cardListThunk.rejected,(state,action)=>{
            state.loading = "error"
            state.error=action.error
            // notifyError(action.error)

        })
    }
})

export const appLoadingState = (state)=>state.app.loading
export const cardList = state=>state.app.institutionCardList

export default appSlice.reducer

