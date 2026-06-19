import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../api/AxiosInstance";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(
        "users/register/",
        formData
      );

      localStorage.setItem(
        "access_token",
        res.data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        res.data.refresh
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Signup failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post(
        "users/login/",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "access_token",
        res.data.access_token
      );

      localStorage.setItem(
        "refresh_token",
        res.data.refresh
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Login failed"
      );
    }
  }
);