import { createSlice } from "@reduxjs/toolkit"


const initState={
    searchText:"",
    request_type: "All Requests",
    request_status: 10,
    showModal: false,
    modal_info: {
        first_name:"",
        last_name:"",
        nin:"",
        ref_id:"",
        middle_name:"",
        request_status: "",
        request_type:""
    }
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
            updateListModalState:(state,action)=>{
                state.showModal = action.payload
            },
            updateModalInfo:(state,action)=>{
                state.modal_info.first_name = action.payload.first_name
                state.modal_info.last_name = action.payload.last_name
                state.modal_info.nin= action.payload.nin
                state.modal_info.ref_id = action.payload.ref_id
                state.modal_info.middle_name = action.payload.middle_name
                state.modal_info.request_status = action.payload.request_status
                state.modal_info.request_type = action.payload.request_type
            },
            clearFilter:(state,action)=>{
                state.request_status = 10
                state.request_type = "All Requests"
                state.searchText = ""
            }
        }
    }
)

export const {updateRequestStatus,updateRequestType,updateSearch,clearFilter,updateListModalState,updateModalInfo} = listingFilterSlice.actions
export const modalInfo = state=> state.listFilter.modal_info
export default listingFilterSlice.reducer