import { createSlice } from "@reduxjs/toolkit";
import { asyncStatus, save_tokens_constant } from "../../utils/asyncStatus";
import { success_toast_message, error_toast_message } from "../../utils/toast_message";
import { check_auth, login_service_auth, signup_service_auth } from "../services/authSlice";

const initialState = {
    // status
    check_auth_status: asyncStatus.IDLE,
    login_status: asyncStatus.IDLE,
    signup_status: asyncStatus.IDLE,
    user_logout_status: asyncStatus.IDLE,

    // data
    userAuth: false,
    user: null,
    authTokens: null,
    user_profile: null,

    // error
    check_auth_error: null,
    login_error: null,
    signup_error: null,
    user_logout_error: null,
};

const user_auth_slice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setAuthState(state, { payload }) {
            state.userAuth = payload;
            state.check_auth_status = asyncStatus.SUCCEEDED;
        },
        setIdleStatus(state) {
            state.login_status = asyncStatus.IDLE;
        },
        setIdleRegisterStatus(state) {
            state.signup_status = asyncStatus.IDLE;
        },
    },
    extraReducers: (builder) => {
        // Login cases
        builder.addCase(login_service_auth.pending, (state) => {
            state.login_status = asyncStatus.LOADING;
        });

        builder.addCase(login_service_auth.fulfilled, (state, { payload }) => {
            state.authTokens = payload.token;
            state.login_status = asyncStatus.SUCCEEDED;
            state.user = payload.data;
            state.userAuth = true;
            success_toast_message("Login Successfully");
            state.login_error = null;
            localStorage.setItem(save_tokens_constant.AUTH, payload.token);
        });

        builder.addCase(login_service_auth.rejected, (state, action) => {
            state.login_status = asyncStatus.ERROR;
            state.login_error = action.error;
            error_toast_message(action.error.message);
        });

        // Signup cases
        builder.addCase(signup_service_auth.pending, (state) => {
            state.signup_status = asyncStatus.LOADING;
        });

        builder.addCase(signup_service_auth.fulfilled, (state, { payload }) => {
            state.authTokens = payload.token;
            state.signup_status = asyncStatus.SUCCEEDED;
            state.user = payload.data;
            state.userAuth = true;
            success_toast_message("Signup Successfully");
            state.signup_error = null;
            localStorage.setItem(save_tokens_constant.AUTH, payload.token);
        });

        builder.addCase(signup_service_auth.rejected, (state, action) => {
            state.signup_status = asyncStatus.ERROR;
            state.signup_error = action.error;
            
            error_toast_message(action.error.message);
        });

        // Check auth cases
        builder.addCase(check_auth.pending, (state) => {
            state.check_auth_status = asyncStatus.LOADING;
        });

        builder.addCase(check_auth.fulfilled, (state, { payload }) => {
            const { status, user } = payload;
            state.check_auth_status = asyncStatus.SUCCEEDED;
            if (status === "success") {
                state.user = user;
                state.userAuth = true;
            } else {
                state.userAuth = false;
            }
        });

        builder.addCase(check_auth.rejected, (state, action) => {
            state.check_auth_status = asyncStatus.ERROR;
            state.check_auth_error = action.error;
            // error_toast_message(action.error.message);
        });
    },
});

export const { setAuthState, setIdleStatus, setIdleRegisterStatus } = user_auth_slice.actions;

export default user_auth_slice.reducer;
