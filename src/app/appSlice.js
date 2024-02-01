import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { appAxios } from "../utils/axiosConfig"
import { CardRequestStatusList } from "../utils/requestStatus";
import { Bounce, toast } from "react-toastify";
import { updateTokenFromStorage } from "./login/loginSlice";

const initState = {
    institutionCardList: [],
    profileData: {},
    loading: "idle", //idle,loading,success,error
    error: null
}

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


export const appDataThunk = createAsyncThunk('user/profile', async (token,thukApi) => {
    try {

        const response = await appAxios.get('/user', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        // const response = await appAxios.get('cards/getBankCardRequests/:bankId')
        
        return {
            data: response.data,
        }
    } catch (e) {
        if(e.response.status == 403 || e.response.status == 401){
            thukApi.dispatch(updateTokenFromStorage(""))
            localStorage.removeItem("token")
            
        }
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


export const listUpdateThunk = createAsyncThunk('card/updateStatus', async (value) => {
    try {

        const response = await appAxios.patch(`/cards/updateCardRequest`,value.data,{
            headers: {
                "Authorization": `Bearer ${value.token}`
            }
        })
        

        return {
            data: response.data,
            formerValue: {...value.data,status_id:value.old_status_id}
        }
    } catch (e) {
        if (e.response?.data?.error) {
            return {
                data: Object.values(e.response.data.error).flat()[0],
                formerValue: {...value.data,status_id:value.old_status_id}
            }
        } else if (e.response?.data?.message) {
            return {
                data: e.response?.data?.message,
                formerValue: {...value.data,status_id:value.old_status_id}
            }
            
        }
        else {
            return {
                data: e.message,
                formerValue: {...value.data,status_id:value.old_status_id}
            }
        }
    }

}
)

export const cardListThunk = createAsyncThunk('card/list', async (access) => {
    try {

        const response = await appAxios.get(`/cards/getBankCardRequests/${access.bank_id}`, {
            headers: {
                "Authorization": `Bearer ${access.token}`
            }
        })
        console.log(response.data)

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

const appSlice = createSlice({
    name: "appSlice",
    initialState: initState,
    reducers: {
        updateReqestStatus:(state,action)=>{
            state.institutionCardList = state.institutionCardList.map(mapVal=>{
                if(mapVal.id == action.payload.request_id){
                    console.log(action.payload.request_status_id)
                    console.log(CardRequestStatusList.find(ev=>ev.id === action.payload.request_status_id))
                    return {...mapVal,request_status: [CardRequestStatusList.find(ev=>ev.id === action.payload.request_status_id)]}
                }
                return mapVal
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(appDataThunk.pending, (state, action) => {
            state.loading = "loading"
        })
        builder.addCase(appDataThunk.fulfilled, (state, action) => {
            if (action.payload?.data?.result) {

                let result = action.payload?.data?.result
                state.profileData = { ...result }
                console.log(state.profileData)
                return;

            }
            notifyError(action.payload)
            state.loading = "error"
            state.error = action.payload

        })
        builder.addCase(appDataThunk.rejected, (state, action) => {
            state.loading = "error"
            state.error = action.error
            // notifyError(action.error)

        })
        builder.addCase(cardListThunk.fulfilled, (state, action) => {
            if (action.payload?.data?.result) {

                state.loading = "success"
                let result = action.payload?.data?.result
                state.institutionCardList = [...result]
                return;
            }
            state.loading = "error"

            state.error = action.payload

        })
        builder.addCase(cardListThunk.rejected, (state, action) => {
            state.loading = "error"
            state.error = action.error
            // notifyError(action.error)

        })
        builder.addCase(listUpdateThunk.fulfilled, (state, action) => {
            console.log(action.payload)

            if (action.payload?.data?.statusCode !== 200) {
                let oldValue = action.payload.formerValue
                state.institutionCardList = state.institutionCardList.map(mapVal=>{
                    if(mapVal.id == oldValue.request_id){
                        console.log(oldValue.status_id)
                        console.log(CardRequestStatusList.find(ev=>ev.id == oldValue.status_id))
                        return {...mapVal,request_status: [CardRequestStatusList.find(ev=>ev.id === oldValue.status_id)]}
                    }
                    return mapVal
                })
                
                notifyError(action.payload.data)
            }
            
            

        })
        builder.addCase(listUpdateThunk.rejected, (state, action) => {
            notifyError(action.error)

        })
    }
})

export const {updateReqestStatus} = appSlice.actions

export const appLoadingState = (state) => state.app.loading
export const profileData = (state) => state.app.profileData
export const cardList = state => state.app.institutionCardList

export default appSlice.reducer

