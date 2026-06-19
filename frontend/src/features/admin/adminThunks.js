import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../api/AxiosInstance";

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        "admin/users/"
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
        "Failed to fetch users"
      );
    }
  }
);