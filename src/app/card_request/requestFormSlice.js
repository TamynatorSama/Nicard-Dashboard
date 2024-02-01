import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { appAxios } from "../../utils/axiosConfig"
import { notifyError, notifySuccess } from "../../utils/notify"
import { createCardRequestThunk } from "../../utils/commonThunk"


const initState ={
    nin:"",
    date_of_birth:`${new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().substring(0, 10)}`,
    first_name:"",
    last_name: "",
    isLoadingValidation:false,
    isLoading:false,
    middle_name:"",
    phone_number: "",
    card_type: "Select Card Type",
    account:""
}

export const validateNinThunk = createAsyncThunk('request/validate',async(resource,thunkApi)=>{
    const state = thunkApi.getState().authReducer
    try {

        const response = await appAxios.post(`/nin`,resource.data, {
            headers: {
                "Authorization": `Bearer ${state.token}`
            }
        })
        console.log(response)

        return {
            data: response.data,
        }
    } catch (e) {
        console.log(e)
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


const cardRequestFormSlice = createSlice({
    name: 'requestForm',
    initialState: initState,
    reducers:{
        updateForm:(state,action)=>{
            state[`${action.payload.target}`] = action.payload.value
        },
        resetNameField:(state,action)=>{
            state.first_name = ""
            state.last_name = ""
            state.middle_name = ""
        },
        resetFields:(state,action)=>{
            state.first_name = ""
                state.last_name = ""
                state.middle_name = ""
                state.date_of_birth = `${new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().substring(0, 10)}`
                state.nin = ""
                state.phone_number=""
                state.card_type="Select Card Type"
                state.account=""
        }
    },
    extraReducers(builder){
        builder.addCase(validateNinThunk.pending, (state, action) => {
            state.isLoadingValidation = true
        })
        builder.addCase(validateNinThunk.fulfilled, (state, action) => {
            state.isLoadingValidation = false
            if (action.payload?.data?.result) {
                notifySuccess(action.payload?.data?.message)
                let userInfo = action.payload?.data?.result.user_info
                state.first_name = userInfo.first_name
                state.last_name = userInfo.last_name
                state.middle_name = userInfo.middle_name
                return
                // let result = action.payload?.data?.result
                // state.accessList = [ ...result ]
                // return;
            }
            notifyError(action.payload)

        })
        builder.addCase(validateNinThunk.rejected, (state, action) => {
            state.isLoadingValidation = false
            notifyError(action.error)

        })




        builder.addCase(createCardRequestThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(createCardRequestThunk.fulfilled, (state, action) => {
            state.isLoading = false
            if (action.payload?.data?.result) {
                notifySuccess(action.payload?.data?.message)
                state.first_name = ""
                state.last_name = ""
                state.middle_name = ""
                state.date_of_birth = `${new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().substring(0, 10)}`
                state.nin = ""
                state.phone_number=""
                state.card_type="Select Card Type"
                state.account=""
                return
                // let result = action.payload?.data?.result
                // state.accessList = [ ...result ]
                // return;
            }
            notifyError(action.payload)

        })
        builder.addCase(createCardRequestThunk.rejected, (state, action) => {
            state.isLoading = false
            notifyError(action.error)

        })
    }
})

export const {updateForm,resetNameField,resetFields} = cardRequestFormSlice.actions

export default cardRequestFormSlice.reducer