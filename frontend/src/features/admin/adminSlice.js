import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminUsers } from "./adminThunks";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users =
          action.payload.results ||
          action.payload;
      })

      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;