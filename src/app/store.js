import { configureStore } from "@reduxjs/toolkit";
import navigatorReducer from './navigator/navigatorSlice'
import cardRequestFormReducer from './card_request/requestFormSlice'
import cardListingPaginatorReducer from './card_listing/pagination'
import authReducer from './login/loginSlice'
import appReducer from './appSlice'

export const store = configureStore({
    reducer:{
        navigator: navigatorReducer,
        cardRequestForm: cardRequestFormReducer,
        listingPaginator: cardListingPaginatorReducer,
        authReducer,
        app: appReducer

    }
})