import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { type_constant } from "../../utils/asyncStatus";

export const login_service_auth = createAsyncThunk(
  type_constant.LOGIN,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`login`, post_data);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);
export const signup_service_auth = createAsyncThunk(
  type_constant.SIGNUP,
  async (post_data) => {
    try {
      const response = await apiHandle.post(`register`, post_data);
      const res_data = await response.data;
      return res_data;
    } catch (error) {
      if (error?.response?.data) {
        if (error.response.data.message) {
          throw Error(error.response.data.message);
        }

        if (error.response.data.errors) {
          //map the errors to a single string
          const errorMessage = error.response.data.errors
            ? Object.values(error.response.data.errors).join(", ")
            : error.response.data.message;
          throw Error(errorMessage);
        }
      } else {
        throw Error(error.message);
      }
    }
  }
);

export const check_auth = createAsyncThunk(
  type_constant.CHECK_AUTH,
  async () => {
    try {
      const response = await apiHandle.get(`check-auth`);
      const res_data = await response.data;

      return res_data;
    } catch (error) {
      if (error?.response?.data) {
        throw Error(error.response.data.message);
      } else {
        throw Error(error.message);
      }
    }
  }
);
