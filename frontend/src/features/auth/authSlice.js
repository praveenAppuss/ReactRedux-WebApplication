import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, fetchProfile } from "./authThunks";

const initialState = {

    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken:
        localStorage.getItem("access_token") || null,
    profile: null,
    loading: false,
    error: null,

    isLoggedIn:
        !!localStorage.getItem("access_token"),
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isLoggedIn = false;

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                signupUser.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.accessToken =
                        action.payload.access_token;
                    state.isLoggedIn = true;
                }
            )

            .addCase(
                signupUser.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                loginUser.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.accessToken =
                        action.payload.access_token;
                    state.isLoggedIn = true;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })

            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;