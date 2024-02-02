import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { appAxios } from "../../utils/axiosConfig"

const initState = {
    accessList: [],
    state: "idle", // idle,loading,success,error
    error: ""
}

export const getUserListingSlice = createAsyncThunk('accessControl/listing', async (resource) => {
    // let url = 
    try {

        const response = await appAxios.get(`/user/getUserBanks/${resource.bank_id}`, {
            headers: {
                "Authorization": `Bearer ${resource.token}`
            }
        })

        return {
            data: response.data,
        }
    } catch (e) {
        if (e.response?.data?.error) {
            return Object.values(e.response.data.error).flat()[0]
        } else if (e.response?.data?.message) {
            return e.response?.data?.message
        }
        else {
            return e.message
        }
    }
})


const userAccessListSlice = createSlice({
    name: 'userAccessList',
    initialState: initState,
    reducers: { 
        addAccessUser:(state,action)=>{
            state.accessList.push(action.payload)
        }
    },
    extraReducers(builder){
        builder.addCase(getUserListingSlice.pending, (state, action) => {
            state.state = "loading"
        })
        builder.addCase(getUserListingSlice.fulfilled, (state, action) => {
            if (action.payload?.data?.result) {
                state.state = "success"
                let result = action.payload?.data?.result
                state.accessList = [ ...result ]
                return;
            }
            state.state = "error"
            state.error = action.payload

        })
        builder.addCase(getUserListingSlice.rejected, (state, action) => {
            state.state = "error"
            state.error = action.error
            // notifyError(action.error)

        })
    }
})

export const  {addAccessUser}= userAccessListSlice.actions
export const accessUserList = state=>state.accessList.accessList
export const accessLoaderState= state=>state.accessList.state
export default userAccessListSlice.reducer
