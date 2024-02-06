import { createSlice } from "@reduxjs/toolkit"


const initState = {
    currentPage:1,
    perPage: 10,

}

const cardListingPaginationSlice = createSlice({
    name: 'paginationSlice',
    initialState: initState,
    reducers:{
        changeCurrentPage:(state,action)=>{
            state.currentPage = action.payload
        },
        changeListPerPage:(state,action)=>{
            state.perPage = action.payload
        },
        setCurrentPage:(state,action)=>{
            state.currentPage = action.payload
        }
    }
})

export const {setCurrentPage,changeListPerPage,changeCurrentPage} = cardListingPaginationSlice.actions

export default cardListingPaginationSlice.reducer