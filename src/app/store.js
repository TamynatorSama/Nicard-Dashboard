import { configureStore } from "@reduxjs/toolkit";
import navigatorReducer from './navigator/navigatorSlice'
import cardRequestFormReducer from './card_request/requestFormSlice'

export const store = configureStore({
    reducer:{
        navigator: navigatorReducer,
        cardRequestForm: cardRequestFormReducer
    }
})