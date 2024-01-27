import { createSlice } from "@reduxjs/toolkit";

const initState = {
  selectedPage: 0,
};

export const navigatorSlice = createSlice({
  name: "navigator",
  initialState: initState,
  reducers: {
    changePage: (state, action) => {
      state.selectedPage = action.payload;
    },
  },
});

export const { changePage } = navigatorSlice.actions;
export default navigatorSlice.reducer;
