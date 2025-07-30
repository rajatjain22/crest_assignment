import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
  company?: string;
  phone?: string;
  createdAt: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data.users;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: Omit<User, "_id" | "createdAt">) => {
    const response = await axiosInstance.post("/api/auth/user", userData);
    return response.data.user;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData: Partial<User>) => {
    const response = await axiosInstance.put("/api/auth/user", userData);
    return response.data.user;
  }
);

export const createUserByAdmin = createAsyncThunk(
  "users/createUser",
  async (userData: Omit<User, "_id" | "createdAt">) => {
    const response = await axiosInstance.post("/api/auth/user", userData);
    return response.data.user;
  }
);

export const updateUserByAdmin = createAsyncThunk(
  "users/updateUserByAmdin",
  async (userData: Partial<User> & { _id: string }) => {
    const response = await axiosInstance.patch(`/api/users`, userData);
    return response.data.user;
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await axiosInstance.delete(`/api/users?id=${userId}`);
    return userId;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.user);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        const idx = state.users.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) {
          state.users[idx] = action.payload;
        }
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
