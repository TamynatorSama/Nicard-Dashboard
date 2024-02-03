import { createAsyncThunk } from "@reduxjs/toolkit";
import { appAxios } from "./axiosConfig";
import { addCardRequest } from "../app/appSlice";

export const createCardRequestThunk = createAsyncThunk('card/thunk',async(request,thunkApi)=>{
    const state = thunkApi.getState().authReducer

    try {

        const response = await appAxios.post('/cards/createCardRequest', request,{
            headers: {
                "Authorization": `Bearer ${state.token}`
            }
        })
        if(response.status === 201){
            thunkApi.dispatch(addCardRequest(response.data.result))
        }
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