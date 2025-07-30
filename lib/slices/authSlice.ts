import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "api/auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      return { token, user };
    } catch (err: any) {
      const message = err.response?.data?.error || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "api/auth/signup",
  async (
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role?: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`/api/auth/signup`, userData);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.error || "Signup failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const response = await axiosInstance.get("/api/auth/user");
    return response.data.user;
  }
);

export const logout = createAsyncThunk("api/auth/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Signup failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "fetchCurrentUser failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
