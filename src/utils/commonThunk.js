import { createAsyncThunk } from "@reduxjs/toolkit";
import { appAxios } from "./axiosConfig";

export const createCardRequestThunk = createAsyncThunk('card/thunk',async(request,thunkApi)=>{
    const state = thunkApi.getState().authReducer

    try {

        const response = await appAxios.post('/cards/createCardRequest', request,{
            headers: {
                "Authorization": `Bearer ${state.token}`
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