import { createSlice } from "@reduxjs/toolkit"


const initState={
    searchText:"",
    request_type: "All Requests",
    request_status: 10
}

const listingFilterSlice = createSlice(
    {
        name: 'listingSlice',
        initialState: initState,
        reducers:{
            updateSearch:(state,action)=>{
                state.searchText = action.payload
            },
            updateRequestType:(state,action)=>{
                state.request_type = action.payload
            },
            updateRequestStatus:(state,action)=>{
                state.request_status = action.payload
            },
            clearFilter:(state,action)=>{
                state.request_status = 10
                state.request_type = "All Requests"
                state.searchText = ""
            }
        }
    }
)

export const {updateRequestStatus,updateRequestType,updateSearch,clearFilter} = listingFilterSlice.actions
export default listingFilterSlice.reducer