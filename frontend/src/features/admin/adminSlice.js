import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminUsers, toggleUserStatus, updateAdminUser, createAdminUser } from "./adminThunks";

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
            })
            .addCase(
                toggleUserStatus.fulfilled,
                (state, action) => {
                    const index = state.users.findIndex(
                        (u) => u.id === action.payload.id
                    );

                    if (index !== -1) {
                        state.users[index] = {
                            ...state.users[index],
                            ...action.payload,
                        };
                    }
                }

            )
            .addCase(
                updateAdminUser.fulfilled,
                (state, action) => {
                    const index = state.users.findIndex(
                        (u) => u.id === action.payload.id
                    );

                    if (index !== -1) {
                        state.users[index] = action.payload;
                    }
                }
            )
            .addCase(
                createAdminUser.fulfilled,
                (state, action) => {
                    state.users.unshift(action.payload);
                }
            );
    },
});

export default adminSlice.reducer;