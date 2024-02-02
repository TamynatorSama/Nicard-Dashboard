import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appAxios } from "../../utils/axiosConfig";
import { notifyError, notifySuccess } from "../../utils/notify";
import { addAccessUser } from "./userList";
import { profileData } from "../appSlice";


const initialState = {
    isModalOpen: false,
    isLoadingBankBranches: false,
    isLoading: false,
    branch_list: [],
    requestForm: {
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
        branch: "Select Branch",
        roles: 100
    }
}


export const createNewUserThunk = createAsyncThunk('accessControl/create', async (data, thunkApi) => {
    const state = thunkApi.getState().authReducer
    const userProfile = thunkApi.getState().app


    try {

        const response = await appAxios.post(`/user/createBankUser`, data, {
            headers: {
                "Authorization": `Bearer ${state.token}`
            }
        })
        console.log(userProfile)
        console.log({
            ...response.data.result,
            bank_data: [
                // userProfile.institution.bank_data[0]                
            ]
        })

        if (response.status === 201) {
            thunkApi.dispatch(addAccessUser({
            ...response.data.result,
            bank_data: [
                // userProfile.institution.bank_data[0]                
            ]
        }))
        }

        return {
            data: response.data
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

export const getBankBranchThunk = createAsyncThunk("accessControl/bank/branch", async (payload, thunkApi) => {
    try {

        const response = await appAxios.get(`/banks/getBranches/${payload.bank_id}`, {
        })

        console.log(response)

        return {
            data: response.data
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





const createNewUserSlice = createSlice({
    name: "accessControl/createUser",
    initialState,
    reducers: {
        updateState: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        updateFormState: (state, action) => {
            state.requestForm[`${action.payload.target}`] = action.payload.value
        },
        resetForm: (state, action) => {
            state.requestForm.branch = 100
            state.requestForm.first_name = ""
            state.requestForm.last_name = ""
            state.requestForm.phone_number = ""
            state.requestForm.password = ""
            state.requestForm.email = ""
            state.requestForm.branch = "Select Branch"
            state.requestForm.roles = 100
        }
    },
    extraReducers(builder) {
        builder.addCase(getBankBranchThunk.pending, (state, action) => {
            state.isLoadingBankBranches = true
        })
        builder.addCase(getBankBranchThunk.fulfilled, (state, action) => {
            state.isLoadingBankBranches = false
            if (action.payload?.data?.result) {
                let result = action.payload?.data?.result.banks
                state.branch_list = [...result]
                state.requestForm.branch = result[0].branch_code
                return;
            }
            notifyError(action.payload)

        })
        builder.addCase(getBankBranchThunk.rejected, (state, action) => {
            state.isLoadingBankBranches = false
            notifyError(action.error)

        })
        builder.addCase(createNewUserThunk.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(createNewUserThunk.fulfilled, (state, action) => {
            state.isLoading = false
            if (action.payload?.data?.result) {
                notifySuccess(action.payload.data.message)
                state.requestForm.branch = 100
                state.requestForm.first_name = ""
                state.requestForm.last_name = ""
                state.requestForm.phone_number = ""
                state.requestForm.password = ""
                state.requestForm.email = ""
                state.requestForm.branch = "Select Branch"
                state.requestForm.roles = 100
                state.isModalOpen = false
                return;
            }
            notifyError(action.payload)

        })
        builder.addCase(createNewUserThunk.rejected, (state, action) => {
            console.log(action.error)
            state.isLoading = false
            notifyError(action.error.message)

        })
    }

})

export const { updateState, updateFormState, resetForm } = createNewUserSlice.actions
export const requestForm = state => state.createNewUser.requestForm
export const createUserModalState = state => state.createNewUser.isModalOpen
export default createNewUserSlice.reducer

// password = 8RhHa52xZKHJ09t