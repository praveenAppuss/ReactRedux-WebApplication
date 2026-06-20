import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../api/AxiosInstance";

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (search = "", { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(
        "admin/users/",
        {
          params: search
            ? { search }
            : {},
        }
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

export const toggleUserStatus = createAsyncThunk(
  "admin/toggleUserStatus",
  async ({ id, is_active }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.patch(
        `admin/users/${id}/`,
        {
          is_active: !is_active,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
        "Failed to update user"
      );
    }
  }
);

export const updateAdminUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.patch(
        `admin/users/${id}/`,
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
        "User update failed"
      );
    }
  }
);

export const createAdminUser = createAsyncThunk(
  "admin/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        "admin/users/",
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
        "User creation failed"
      );
    }
  }
);

export const deleteAdminUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(
        `admin/users/${id}/`
      );

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
        "Delete failed"
      );
    }
  }
);